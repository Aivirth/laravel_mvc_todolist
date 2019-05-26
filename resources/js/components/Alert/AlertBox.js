import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import AlertContent from "./AlertContent";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(3)
    }
}));

function AlertBox(props) {
    const classes = useStyles();
    const { variant, message } = props;
    let { autoHideDuration } = props;
    const [open, setOpen] = React.useState(true);

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    }

    autoHideDuration ? autoHideDuration : 6000;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <AlertContent
                variant={variant}
                className={classes.margin}
                message={message}
                onClose={handleClose}
            />
        </Snackbar>
    );
}

export default AlertBox;
