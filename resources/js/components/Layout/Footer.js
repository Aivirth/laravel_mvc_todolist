import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { indigo, grey } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";

const baseBgColor = indigo["500"];
const baseTextColor = grey["50"];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: baseBgColor,
        width: "100%",
        color: baseTextColor
    },
    linkText: {
        marginRight: theme.spacing(1)
    },
    column: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.column}>
                            <span>Copyright : Aivirth - 2019</span>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.column}>
                            <Button
                                variant="contained"
                                target="_blank"
                                href="https://github.com/Aivirth/laravel_mvc_todolist"
                            >
                                <span className={classes.linkText}>Github</span>
                                <i className="fab fa-github" />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
