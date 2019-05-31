import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    progress: {
        marginTop: theme.spacing(16),
        marginBottom: theme.spacing(16),
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

function SimpleCircularProgress() {
    const classes = useStyles();

    return <CircularProgress className={classes.progress} />;
}

export default SimpleCircularProgress;
