import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

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
