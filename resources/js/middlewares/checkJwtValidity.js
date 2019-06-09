import { compareAsc, parseISO } from "date-fns";
import { formatDateToSQLFormat } from "../helpers";
import axios from "../axios";
import {
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR
} from "../redux/actions/actionsTypes";

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
                if (compareAsc(expirationDate, now) !== 1) {
                    console.log("expired");
                } else {
                    const axiosConfig = {
                        headers: { Authorization: `bearer ${tokenRaw.token}` }
                    };
                    axios
                        .get("/refresh", axiosConfig)
                        .then(res => {
                            if (res.status !== 429 || res.status !== 401) {
                                console.log(res);
                                dispatch({
                                    type: REFRESH_TOKEN_SUCCESS
                                });
                            }
                        })
                        .catch(err => {
                            if (
                                err.response.status !== 429 ||
                                err.response.status !== 401
                            ) {
                                console.log(err.response);
                                dispatch({
                                    type: REFRESH_TOKEN_ERROR
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
