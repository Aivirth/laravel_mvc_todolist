import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

export const logIn = credentials => {
    return (dispatch, getState) => {
        axios
            .post("login", credentials)
            .then(response =>
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    response
                })
            )
            .catch(err => dispatch(actionTypes.LOGIN_ERROR, err));
    };
};
