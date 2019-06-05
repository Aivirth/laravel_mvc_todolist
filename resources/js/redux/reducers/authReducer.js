import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const initialState = {
    errors: null,
    user: null,
    access_token: null,
    token_type: null,
    expires_in: null
};

const loginError = (state, action) => {
    console.log("login failed");
    return updateObject(state, {
        errors: "Login error"
    });
};

const loginSuccess = (state, action) => {
    console.log("login success");
    console.log(action);
    const { user, access_token, token_type, expires_in } = action.data;

    return updateObject(state, {
        errors: null,
        user: user,
        access_token: access_token,
        token_type: token_type,
        expires_in: expires_in
    });
};

const signOutError = (state, action) => {
    console.log("logout error");
    return state;
};

const signOutSuccess = (state, action) => {
    console.log("logout success");
    return state;
};

const registerError = (state, action) => {
    console.log("register error");
    return updateObject(state, {
        errors: action.err.message
    });
};

const registerSuccess = (state, action) => {
    console.log("register success");
    return updateObject(state, {
        errors: null
    });
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);

        case actionTypes.LOGIN_ERROR:
            return loginError(state, action);

        case actionTypes.SIGNOUT_SUCCESS:
            return signOutSuccess(state, action);

        case actionTypes.SIGNOUT_ERROR:
            return signOutError(state, action);

        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);

        case actionTypes.REGISTER_ERROR:
            return registerError(state, action);

        default:
            return state;
    }
};

export default authReducer;
