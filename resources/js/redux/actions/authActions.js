import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

export const logIn = credentials => {
    return (dispatch, getState) => {
        return axios
            .post("login", credentials)
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data
                })
            )
            .catch(error => dispatch({ type: actionTypes.LOGIN_ERROR, error }));
    };
};
