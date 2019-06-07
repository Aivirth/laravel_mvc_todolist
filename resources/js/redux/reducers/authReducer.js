import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";
import { addMinutes, format as formatDate } from "date-fns";

const initialState = {
    errors: null,
    user: null,
    access_token: null,
    token_type: null,
    expires: null
};

const loginError = (state, action) => {
    console.log(action);
    return updateObject(state, {
        errors: action.error.response
    });
};

const loginSuccess = (state, action) => {
    const { user, access_token, token_type, expires_in } = action.data;

    const expirationDate = addMinutes(new Date(), expires_in);

    localStorage.setItem(
        "laravelMVC",
        JSON.stringify({
            token: access_token,
            expires: expirationDate
        })
    );

    return updateObject(state, {
        errors: null,
        user: user,
        access_token: access_token,
        token_type: token_type,
        expires: expirationDate
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
