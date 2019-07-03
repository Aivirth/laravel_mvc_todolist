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

export const logOut = () => {
    return dispatch => {
        return axios
            .get("logout")
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.SIGNOUT_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({ type: actionTypes.SIGNOUT_ERROR, error })
            );
    };
};

export const fetchUserFromToken = () => {
    return (dispatch, getState) => {
        return axios
            .get("user")
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.FETCH_USER_FROM_TOKEN_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.FETCH_USER_FROM_TOKEN_ERROR,
                    error
                })
            );
    };
};

export const registerUser = ({ email, password, name }) => {
    return dispatch => {
        return axios
            .post("register", { email, password, name })
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({ type: actionTypes.REGISTER_ERROR, error })
            );
    };
};
