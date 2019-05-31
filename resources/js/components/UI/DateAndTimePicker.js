import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
const useStyles = makeStyles(theme => ({
    grid: {
        width: "60%"
    },
    firstInput: {
        marginRight: theme.spacing(4)
    }
}));

function DateAndTimePicker(props) {
    const classes = useStyles();

    const { onDateChangeHandler, date } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.grid} justify="flex-start">
                <KeyboardDatePicker
                    margin="normal"
                    label="Date picker"
                    value={date}
                    onChange={onDateChangeHandler}
                    className={classes.firstInput}
                />
                <KeyboardTimePicker
                    margin="normal"
                    label="Time picker"
                    value={date}
                    onChange={onDateChangeHandler}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

export default DateAndTimePicker;
