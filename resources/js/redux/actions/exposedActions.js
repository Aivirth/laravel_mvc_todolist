export { logIn, logOut, fetchUserFromToken } from "./authActions";

export {
    fetchProjects,
    fetchSingleProject,
    updateTask,
    createProject
} from "./projectsActions";

export {
    addTaskToSelected,
    removeTaskFromSelected,
    updateTaskStatus,
    deleteTask
} from "./taskActions";
