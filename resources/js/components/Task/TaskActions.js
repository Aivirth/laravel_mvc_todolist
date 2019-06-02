import React from "react";
import axios from "../../axios";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Fullscreen as FullscreenIcon,
    Create as CreateIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    NoteAdd as NoteAddIcon,
    KeyboardArrowDown as ArrowDownIcon,
    KeyboardArrowUp as ArrowUpIcon
} from "@material-ui/icons/";

export default function TaskActions(props) {
    let [isOpen, setIsOpen] = React.useState(false);

    const { taskId } = props;

    const toggleOpenHandler = e => {
        e.preventDefault();

        setIsOpen(!isOpen);
    };

    const deleteRequestHandler = id => {
        console.log(id, "deleted");
    };

    const statusRequestHandler = id => {
        console.log(id, "toggled");
    };

    return (
        <>
            <IconButton edge="end" aria-label="Edit">
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
                onClick={() => statusRequestHandler(taskId)}
            >
                <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
                edge="end"
                aria-label="Status"
                onClick={toggleOpenHandler}
            >
                {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
        </>
    );
}
