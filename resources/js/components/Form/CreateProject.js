import React from "react";
import { Link } from "react-router";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "../../axios";
import Button from "@material-ui/core/Button";
import AlertBox from "../Alert/AlertBox";

const useStyles = makeStyles(theme => ({
    container: {},
    textField: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        display: "block",
        width: "100%",
        paddingBottom: theme.spacing(2)
    },
    textArea: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        display: "block",
        minHeight: 400,
        width: "100%",
        paddingBottom: theme.spacing(2)
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    submit: {
        width: "100%",
        display: "block",
        marginTop: theme.spacing(3)
    }
}));

function TextFields() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        user_id: null
    });

    const [errors, setErrors] = React.useState(null);

    React.useEffect(() => setValues({ ...values, user_id: 2 }), []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const submitHandler = e => {
        e.preventDefault();

        axios.defaults.headers.common = {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
        };

        axios
            .post("/projects", values)
            .then(response => console.log(response))
            .catch(err => {
                setErrors({ ...err });
            });
    };

    return (
        <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <TextField
                onChange={handleChange("title")}
                id="standard-dense"
                label="Title"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                fullWidth
            />

            <TextField
                label="Description"
                multiline
                rowsMax="4"
                value={values.description}
                onChange={handleChange("description")}
                className={classes.textField}
                margin="normal"
                placeholder="Description"
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.submit}
                type="submit"
            >
                Create
            </Button>
            <AlertBox />
        </form>
    );
}

export default TextFields;
