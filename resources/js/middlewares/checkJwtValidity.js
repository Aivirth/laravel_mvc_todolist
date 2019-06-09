import { compareAsc, parseISO } from "date-fns";
import { formatDateToSQLFormat } from "../helpers";
import axios from "../axios";

const checkJwtValidity = ({ dispatch, getState }) => {
    // Called when calling applyMiddleware so
    // our middleware can have access to the store

    return next => {
        // next is the following action to be run
        // after this middleware

        return action => {
            // finally, this is where our logic lives for
            // our middleware.

            /**
             * 1    - get access_token from localStorage
             * 1.a  - check if token !null
             * 2    - get expire date
             * 3    - check if date expired or not
             * 3.a  - if date expired send refresh request through axios
             * 4    - handle failure and success
             */

            const tokenRaw = JSON.parse(localStorage.getItem("laravelMVC"));

            if (tokenRaw) {
                const expirationDate = parseISO(
                    formatDateToSQLFormat(tokenRaw.expires)
                );
                const now = parseISO(formatDateToSQLFormat(new Date()));

                console.log(expirationDate);
                //temp inverted for debugging
                if (compareAsc(expirationDate, now) === 1) {
                    console.log("expired");
                } else {
                    const axiosConfig = {
                        headers: { Authorization: `bearer ${tokenRaw.token}` }
                    };
                    axios
                        .get("/refresh", axiosConfig)
                        .then(res => {
                            if (
                                res.response.status !== 429 ||
                                res.response.status !== 401
                            ) {
                                console.log(res);
                                return dispatch({ type: "Refresh" });
                            }
                        })
                        .catch(err => {
                            if (
                                err.response.status !== 429 ||
                                err.response.status !== 401
                            ) {
                                console.log(err.response);
                                return dispatch({
                                    type: "Refresh failed"
                                });
                            }
                        });
                }
            }

            console.log(action);

            return next(action);
        };
    };
};

export default checkJwtValidity;
