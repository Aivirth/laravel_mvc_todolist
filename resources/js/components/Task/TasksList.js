import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "../../axios";

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

    React.useEffect(() => {
        const tasks = props.tasks;
        if (tasks) {
            setRows([...tasks]);
        }
    }, []);

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
                            <TaskActions taskId={row.id} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }

    return listOutput;
}
