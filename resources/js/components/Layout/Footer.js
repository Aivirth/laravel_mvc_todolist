import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { indigo, grey } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";

const baseBgColor = indigo["500"];
const baseTextColor = grey["50"];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: baseBgColor,
        width: "100%",
        color: baseTextColor
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        xs=12
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        column
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
