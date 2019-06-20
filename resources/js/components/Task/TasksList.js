import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../axios";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TaskDialog from "./TaskDialog";

import TaskActions from "./TaskActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid black"
    }
}));

export default function TasksList(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    let [rows, setRows] = React.useState(null);

    let [isDialogOpen, setIsDialogOpen] = React.useState(false);

    let [currentActiveTask, setCurrentActiveTask] = React.useState(null);

    React.useEffect(() => {
        const tasks = props.tasks;
        if (tasks) {
            setRows([...tasks]);
        }
    }, [props.tasks]);

    const handleClickOpen = taskId => {
        setIsDialogOpen(true);
        setCurrentActiveTask(taskId);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
        setCurrentActiveTask(null);
    };

    const dialogSubmitHandler = taskData => {
        const axiosOptions = {
            headers: { "Content-Type": "application/json" }
        };

        const { currentTaskId: taskId, description, title } = taskData;

        axios
            .patch(
                `/tasks/${taskId}`,
                {
                    title,
                    description
                },
                axiosOptions
            )
            .then(res => {
                setIsDialogOpen(false);
                setCurrentActiveTask(null);
            })
            .catch(err => console.log(err.response));
    };

    const handleToggle = taskId => () => {
        const currentIndex = checked.indexOf(taskId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(taskId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    let listOutput = "Loading...";

    if (rows) {
        listOutput = (
            <>
                <List className={classes.root}>
                    {rows.map(row => (
                        <ListItem
                            key={row.id}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(row.id)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(row.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`${row.title}`} />

                            <ListItemSecondaryAction>
                                <TaskActions
                                    taskId={row.id}
                                    dialogOpenHandler={handleClickOpen}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                {/* {dialogOutput} */}

                {currentActiveTask && isDialogOpen ? (
                    <TaskDialog
                        dialogTitle="Edit task"
                        dialogContentText=""
                        onCloseHandler={handleClose}
                        dialogStatus={isDialogOpen}
                        currentTaskId={currentActiveTask}
                        onSubmitHandler={dialogSubmitHandler}
                    />
                ) : null}
            </>
        );
    }

    return listOutput;
}
