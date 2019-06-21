import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectsReducer from "./projectsReducer";
import tasksReducer from "./tasksReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer
});

export default rootReducer;
