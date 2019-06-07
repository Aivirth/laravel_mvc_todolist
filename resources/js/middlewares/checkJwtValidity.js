import { compareDesc, parseISO } from "date-fns";
import { formatDateToSQLFormat } from "../helpers";

const checkJwtValidity = store => {
    // Called when calling applyMiddleware so
    // our middleware can have access to the store

    return next => {
        // next is the following action to be run
        // after this middleware

        return action => {
            // finally, this is where our logic lives for
            // our middleware.

            /**
             * 1    - get token from localStorage
             * 1.a  - check if token !null
             * 2    - get expire date
             * 3    - check if date expired or not
             * 3.a  - if date expired send refresh request through axios
             * 4    - handle failure and success
             */

            const token = JSON.parse(localStorage.getItem("laravelMVC"));

            if (token) {
                const expirationDate = parseISO(
                    formatDateToSQLFormat(token.expires)
                );
                const now = parseISO(formatDateToSQLFormat(new Date()));

                console.log({ token }, { expirationDate }, { now });

                console.log(compareDesc(expirationDate, now));
            }

            console.log(store.getState());
            const access_token = store.getState().auth.access_token;
            console.log(access_token);
            console.log(`Redux`, action);

            return next(action);
        };
    };
};

export default checkJwtValidity;
