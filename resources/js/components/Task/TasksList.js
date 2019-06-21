import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TaskDialog from "./TaskDialog";

import TaskActions from "./TaskActions";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import {
    updateTask,
    addTaskToSelected,
    removeTaskFromSelected
} from "../../redux/actions/exposedActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    heading: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1)
    }
}));

function TasksList(props) {
    const classes = useStyles();

    const { onUpdateHandler, tasks } = props;

    const [checked, setChecked] = React.useState([0]);

    let [isDialogOpen, setIsDialogOpen] = React.useState(false);
    let [currentActiveTask, setCurrentActiveTask] = React.useState(null);

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

        const { addTaskToSelected, removeTaskFromSelected } = props;

        if (currentIndex === -1) {
            newChecked.push(taskId);
            addTaskToSelected(taskId);
        } else {
            newChecked.splice(currentIndex, 1);
            removeTaskFromSelected(taskId);
        }

        setChecked(newChecked);
    };

    let listOutput = "Loading...";

    if (tasks) {
        listOutput = (
            <>
                <Box boxShadow={2} bgcolor="background.paper" m={1} p={1}>
                    <Typography
                        variant="h5"
                        className={classes.heading}
                        gutterBottom
                    >
                        Tasks
                    </Typography>
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
                </Box>

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
        tasks: state.projects.currentProject.tasks,
        selected: state.tasks.selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTask: ({ currentTaskId, description, title }) => {
            dispatch(updateTask({ currentTaskId, description, title }));
        },
        addTaskToSelected: taskId => {
            dispatch(addTaskToSelected(taskId));
        },
        removeTaskFromSelected: taskId => {
            dispatch(removeTaskFromSelected(taskId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksList);
