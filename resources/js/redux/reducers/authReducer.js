import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const fetchTokenFromLS = () => {
    return localStorage.getItem("laravelMVCtoken") || null;
};

const initialState = (access_token => ({
    errors: null,
    user: null,
    access_token: access_token,
    token_type: access_token ? "Bearer" : null
}))(fetchTokenFromLS());

const loginError = (state, action) => {
    console.log(action);
    return updateObject(state, {
        errors: action.error.response
    });
};

const loginSuccess = (state, action) => {
    const { user, access_token, token_type } = action.data;
    localStorage.setItem("laravelMVCtoken", access_token);

    return updateObject(state, {
        errors: null,
        user: user,
        access_token: access_token,
        token_type: token_type
    });
};

const signOutError = (state, action) => {
    return updateObject(state, {
        errors: action.error.response
    });
};

const signOutSuccess = (state, action) => {
    localStorage.removeItem("laravelMVCtoken");

    return updateObject(state, {
        errors: null,
        user: null,
        access_token: null,
        token_type: null
    });
};

const registerError = (state, action) => {
    console.log(action);
    return updateObject(state, {
        errors: action.err.message
    });
};

const registerSuccess = (state, action) => {
    const { user, access_token, token_type } = action.data;
    localStorage.setItem("laravelMVCtoken", access_token);

    return updateObject(state, {
        errors: null,
        user: user,
        access_token: access_token,
        token_type: token_type
    });
};

const fetchUserFromTokenSuccess = (state, action) => {
    const { user } = action.data;
    return updateObject(state, {
        user: user
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

        case actionTypes.FETCH_USER_FROM_TOKEN_SUCCESS:
            return fetchUserFromTokenSuccess(state, action);

        default:
            return state;
    }
};

export default authReducer;
