import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers";

const initialState = {
    selected: []
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
        case actionTypes.ADD_TASK_TO_SELECTED:
            return addTaskToSelected(state, action);

        case actionTypes.REMOVE_TASK_FROM_SELECTED:
            return removeTaskFromSelected(state, action);

        default:
            return state;
    }
};

export default tasksReducer;
