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

        default:
            return state;
    }
};

export default tasksReducer;
