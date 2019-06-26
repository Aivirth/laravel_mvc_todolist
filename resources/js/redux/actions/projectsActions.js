import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

export const fetchProjects = () => {
    return (dispatch, getState) => {
        return axios
            .get("projects")
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.FETCH_PROJECTS_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({ type: actionTypes.FETCH_PROJECTS_ERROR, error })
            );
    };
};

export const fetchSingleProject = projectId => {
    return (dispatch, getState) => {
        return axios
            .get(`projects/${projectId}`)
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.FETCH_SINGLE_PROJECT_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.FETCH_SINGLE_PROJECT_ERROR,
                    error
                })
            );
    };
};

export const updateTask = ({ currentTaskId: taskId, title, description }) => {
    return (dispatch, getState) => {
        const axiosOptions = {
            headers: { "Content-Type": "application/json" }
        };
        return axios
            .patch(`tasks/${taskId}`, { title, description }, axiosOptions)
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.UPDATE_TASK_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.UPDATE_TASK_ERROR,
                    error
                })
            );
    };
};

export const createProject = ({ title, description, deadline }) => {
    return (dispatch, getState) => {
        const user_id = getState().auth.user.id;
        return axios
            .post(`projects`, { title, description, deadline, user_id })
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.CREATE_PROJECT_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.CREATE_PROJECT_ERROR,
                    error
                })
            );
    };
};
