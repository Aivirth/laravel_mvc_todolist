import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(8)
    }
}));

export default function DashboardBox(props) {
    const { children } = props;
    const classes = useStyles();
    return (
        <Box
            boxShadow={3}
            bgcolor="background.paper"
            p={2}
            className={classes.root}
        >
            {children}
        </Box>
    );
}
