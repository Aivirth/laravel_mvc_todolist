import React from "react";
import axios from "../../axios";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {
    Delete as DeleteIcon,
    Create as CreateIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Replay as ReplayIcon
} from "@material-ui/icons/";

export default function TaskActions(props) {
    const {
        taskId,
        dialogOpenHandler,
        statusChangeHandler,
        isCompleted
    } = props;

    const deleteRequestHandler = id => {
        console.log(id, "deleted");
        console.log(props);
    };

    return (
        <>
            <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => dialogOpenHandler(taskId)}
            >
                <CreateIcon />
            </IconButton>
            <IconButton
                edge="end"
                aria-label="Delete"
                onClick={() => deleteRequestHandler(taskId)}
            >
                <DeleteIcon />
            </IconButton>
            <IconButton
                edge="end"
                aria-label="Complete"
                onClick={() => statusChangeHandler(taskId, !isCompleted)}
            >
                {isCompleted ? <ReplayIcon /> : <CheckCircleOutlineIcon />}
            </IconButton>
        </>
    );
}
