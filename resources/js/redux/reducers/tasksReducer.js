import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const initialState = {
    currentTasks: [],
    selected: [],
    errors: null
};

const initTasksSuccess = (state, action) => {
    return updateObject(state, {
        currentTasks: action.currentProjectTasks,
        errors: null
    });
};

const initTasksError = (state, action) => {
    return updateObject(state, {
        currentTasks: [],
        errors: action.error
    });
};

const addTaskToSelected = (state, action) => {
    const updatedSelected = state.selected;
    updatedSelected.push(action.id);

    return updateObject(state, {
        selected: updatedSelected
    });
};

const removeTaskFromSelected = (state, action) => {
    const updatedSelected = state.selected.filter(id => id !== action.id);
    return updateObject(state, {
        selected: updatedSelected
    });
};

const updateTaskSuccess = (state, action) => {
    const updatedTask = action.data;
    const currentTasksCopy = [...state.currentTasks];

    const updatedTasksArray = currentTasksCopy.filter(
        task => task.id !== updatedTask.id
    );
    updatedTasksArray.push(updatedTask);

    return updateObject(state, {
        currentTasks: updatedTasksArray
    });
};

const updateTaskError = (state, action) => {
    return updateObject(state, {
        errors: action.error
    });
};

const deleteTaskSuccess = (state, action) => {
    const deletedTaskId = action.taskId;
    const currentTasksCopy = { ...state.currentTasks };

    const updatedTasksArray = currentTasksCopy.filter(
        task => task.id !== deletedTaskId
    );

    return updateObject(state, {
        currentTasks: updatedTasksArray
    });
};

const deleteTaskError = (state, action) => {
    return updateObject(state, {
        errors: action.error
    });
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_TASKS_SUCCESS:
            return initTasksSuccess(state, action);

        case actionTypes.INIT_TASKS_ERROR:
            return initTasksError(state, action);

        case actionTypes.ADD_TASK_TO_SELECTED:
            return addTaskToSelected(state, action);

        case actionTypes.REMOVE_TASK_FROM_SELECTED:
            return removeTaskFromSelected(state, action);

        case actionTypes.UPDATE_TASK_SUCCESS:
            return updateTaskSuccess(state, action);

        case actionTypes.UPDATE_TASK_ERROR:
            return updateTaskError(state, action);

        case actionTypes.CHANGE_TASK_STATUS_SUCCESS:
            return updateTaskSuccess(state, action);

        case actionTypes.CHANGE_TASK_STATUS_ERROR:
            return updateTaskSuccess(state, action);

        case actionTypes.DELETE_TASK_SUCCESS:
            return deleteTaskSuccess(state, action);

        case actionTypes.DELETE_TASK_ERROR:
            return deleteTaskError(state, action);

        default:
            return state;
    }
};

export default tasksReducer;
