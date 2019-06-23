import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    icon: {
        margin: theme.spacing(2),
        fontSize: "2rem"
    }
}));

export default function StartItem(props) {
    const { xs, sm, fontawesomeicon, variant, title, url } = props;
    const classes = useStyles();

    const itemStyle = variant ? `StartItem--${variant}` : "StartItem--base";

    return (
        <Grid item xs={xs} sm={sm}>
            <Link to={url} className={`StartItem ${itemStyle}`}>
                <Box boxShadow={1} className={`${classes.paper}`}>
                    <i className={`${fontawesomeicon} ${classes.icon}`} />
                    <Typography component="h3">{title}</Typography>
                </Box>
            </Link>
        </Grid>
    );
}
