import React from "react";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    backLink: {
        marginBottom: theme.spacing(2)
    },
    backLink__anchor: {
        display: "flex",
        alignItems: "center"
    },

    backLink__text: {
        display: "inline-block"
    }
}));

const AdapterLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
));

function BackTo(props) {
    const classes = useStyles();

    return (
        <div className={classes.backLink}>
            <Link
                component={AdapterLink}
                className={classes.backLink__anchor}
                to={props.link}
            >
                <KeyboardArrowLeft />
                {props.text}
            </Link>
        </div>
    );
}

export default BackTo;
