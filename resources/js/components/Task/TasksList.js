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

import { connect } from "react-redux";
import { updateTask } from "../../redux/actions/exposedActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid black"
    }
}));

function TasksList(props) {
    const classes = useStyles();

    const { onUpdateHandler, tasks } = props;

    console.log(props);

    const [checked, setChecked] = React.useState([0]);
    let [rows, setRows] = React.useState(null);
    let [isDialogOpen, setIsDialogOpen] = React.useState(false);
    let [currentActiveTask, setCurrentActiveTask] = React.useState(null);

    // React.useEffect(() => {
    //     const tasks = props.tasks;
    //     if (tasks) {
    //         setRows([...tasks]);
    //     }
    // }, []);

    const handleClickOpen = taskId => {
        setIsDialogOpen(true);
        setCurrentActiveTask(taskId);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
        setCurrentActiveTask(null);
    };

    const dialogSubmitHandler = taskData => {
        setIsDialogOpen(false);
        setCurrentActiveTask(null);
        props.updateTask(taskData);
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

    if (tasks) {
        listOutput = (
            <>
                <List className={classes.root}>
                    {tasks.map(row => (
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

const mapStateToProps = state => {
    return {
        tasks: state.projects.currentProject.tasks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTask: ({ currentTaskId, description, title }) => {
            dispatch(updateTask({ currentTaskId, description, title }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksList);
