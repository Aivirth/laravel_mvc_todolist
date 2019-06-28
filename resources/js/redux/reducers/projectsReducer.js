import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const initialState = {
    allProjects: null,
    errors: null,
    currentProject: null
};

const fetchProjectsSuccess = (state, action) => {
    const { projects } = action.data;
    return updateObject(state, {
        errors: null,
        allProjects: projects
    });
};

const fetchProjectsError = (state, action) => {
    return updateObject(state, {
        errors: action,
        allProjects: null
    });
};

const fetchSingleProjectSuccess = (state, action) => {
    const { projects } = action.data;
    return updateObject(state, {
        errors: null,
        currentProject: projects
    });
};

const fetchSingleProjectError = (state, action) => {
    return updateObject(state, {
        errors: action,
        currentProject: null
    });
};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return fetchProjectsSuccess(state, action);

        case actionTypes.FETCH_PROJECTS_ERROR:
            return fetchProjectsError(state, action);

        case actionTypes.FETCH_SINGLE_PROJECT_SUCCESS:
            return fetchSingleProjectSuccess(state, action);

        case actionTypes.FETCH_SINGLE_PROJECT_ERROR:
            return fetchSingleProjectError(state, action);

        default:
            return state;
    }
};

export default projectsReducer;
