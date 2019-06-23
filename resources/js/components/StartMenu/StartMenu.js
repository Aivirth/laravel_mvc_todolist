import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StartItem from "./StartItem";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(5),
        paddingTop: theme.spacing(3)
    }
}));

const StartMenu = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <StartItem
                    xs={6}
                    sm={6}
                    fontawesomeicon="fas fa-plus-circle"
                    title="Add Project"
                    url="/projects/create"
                />
                <StartItem
                    xs={6}
                    sm={6}
                    fontawesomeicon="fas fa-list-ul"
                    title="View Projects"
                    url="/projects"
                />
            </Grid>
        </div>
    );
};

export default StartMenu;
