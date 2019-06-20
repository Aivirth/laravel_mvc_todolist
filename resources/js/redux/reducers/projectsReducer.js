import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const initialState = {
    projects: null,
    errors: null
};

const fetchProjectsSuccess = (state, action) => {
    const { projects } = action.data;
    return updateObject(state, {
        errors: null,
        projects: projects
    });
};

const fetchProjectsError = (state, action) => {
    return updateObject(state, {
        errors: action,
        projects: null
    });
};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return fetchProjectsSuccess(state, action);

        case actionTypes.FETCH_PROJECTS_ERROR:
            return fetchProjectsErrror(state, action);

        default:
            return state;
    }
};

export default projectsReducer;
