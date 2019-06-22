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

const updateTaskSuccess = (state, action) => {
    const updatedTask = action.data;
    const currentProjectCopy = { ...state.currentProject };
    const tasksCopy = [...currentProjectCopy.tasks];

    const updatedTasksArray = tasksCopy.filter(
        task => task.id !== updatedTask.id
    );
    updatedTasksArray.push(updatedTask);

    currentProjectCopy.tasks = updatedTasksArray;

    return updateObject(state, {
        currentProject: currentProjectCopy
    });
};

const updateTaskError = (state, action) => {
    return updateObject(state, {
        errors: action.error
    });
};

const deleteTaskSuccess = (state, action) => {
    const deletedTaskId = action.taskId;
    const currentProjectCopy = { ...state.currentProject };
    const tasksCopy = [...currentProjectCopy.tasks];

    const updatedTasksArray = tasksCopy.filter(
        task => task.id !== deletedTaskId
    );

    currentProjectCopy.tasks = updatedTasksArray;

    return updateObject(state, {
        currentProject: currentProjectCopy
    });
};

const deleteTaskError = (state, action) => {
    return updateObject(state, {
        errors: action.error
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

export default projectsReducer;