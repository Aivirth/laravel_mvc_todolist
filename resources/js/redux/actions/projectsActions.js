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
