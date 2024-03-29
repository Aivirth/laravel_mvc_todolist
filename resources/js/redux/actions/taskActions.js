import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

export const initTasks = () => {
    return (dispatch, getState) => {
        try {
            const currentProjectTasks = getState().projects.currentProject
                .tasks;
            return dispatch({
                type: actionTypes.INIT_TASKS_SUCCESS,
                currentProjectTasks
            });
        } catch (error) {
            return dispatch({
                type: actionTypes.INIT_TASKS_ERROR,
                error: error
            });
        }
    };
};

export const addTaskToSelected = taskId => {
    return (dispatch, getState) => {
        return dispatch({ type: actionTypes.ADD_TASK_TO_SELECTED, id: taskId });
    };
};

export const removeTaskFromSelected = taskId => {
    return (dispatch, getState) => {
        return dispatch({
            type: actionTypes.REMOVE_TASK_FROM_SELECTED,
            id: taskId
        });
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

export const updateTaskStatus = (taskId, is_completed) => {
    let convertedStatusToProperFormat = null;

    if (is_completed === true) {
        convertedStatusToProperFormat = 1;
    }

    if (is_completed === false) {
        convertedStatusToProperFormat = 0;
    }

    return (dispatch, getState) => {
        const axiosOptions = {
            headers: { "Content-Type": "application/json" }
        };
        return axios
            .patch(
                `tasks/${taskId}`,
                { is_completed: convertedStatusToProperFormat },
                axiosOptions
            )
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.CHANGE_TASK_STATUS_ERROR,
                    error
                })
            );
    };
};

export const deleteTask = taskId => {
    return (dispatch, getState) => {
        return axios
            .delete(`tasks/${taskId}`)
            .then(() =>
                dispatch({
                    type: actionTypes.DELETE_TASK_SUCCESS,
                    taskId
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.DELETE_TASK_ERROR,
                    error
                })
            );
    };
};

export const addTask = ({ project_id, title, description }) => {
    return (dispatch, getState) => {
        return axios
            .post(`projects/${project_id}/tasks`, { title, description })
            .then(({ data }) =>
                dispatch({
                    type: actionTypes.ADD_TASK_SUCCESS,
                    data
                })
            )
            .catch(error =>
                dispatch({
                    type: actionTypes.ADD_TASK_ERROR,
                    error
                })
            );
    };
};
