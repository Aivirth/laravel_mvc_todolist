import * as actionTypes from "./actionsTypes";

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
