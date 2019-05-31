import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "../../axios";
import Button from "@material-ui/core/Button";
import AlertBox from "../Alert/AlertBox";
import { KeyboardArrowLeft } from "@material-ui/icons";
import DateAndTimePicker from "../UI/DateAndTimePicker";
import { formatDateToSQLFormat } from "../../helpers";

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
    },
    backLink: {
        display: "flex",
        alignItems: "center"
    },
    backLink__text: {
        display: "inline-block"
    }
}));

function CreateProject() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        deadline: new Date().toISOString().slice(0, 19),
        user_id: null
    });

    const [errors, setErrors] = React.useState(null);
    const [createSuccess, setCreateSuccess] = React.useState(null);

    //temp
    React.useEffect(() => setValues({ ...values, user_id: 2 }), []);

    const onDateChangeHandler = date => {
        setValues({ ...values, deadline: date });
    };

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

        const correctedValues = { ...values };
        correctedValues.deadline = formatDateToSQLFormat(
            correctedValues.deadline
        );

        axios
            .post("/projects", correctedValues)
            .then(response => {
                setCreateSuccess(true);
                setErrors(false);
            })
            .catch(err => {
                setErrors([...err.response.data]);
            });
    };

    let alertOutput = null;

    if (errors) {
        alertOutput = errors.map((error, index) => {
            const composedMessage = `${error.field}: ${error.message}`;
            return (
                <AlertBox
                    key={error.field}
                    variant="error"
                    message={composedMessage}
                    autoHideDuration={5000 + index * 1500}
                />
            );
        });
    }

    if (createSuccess) {
        alertOutput = (
            <AlertBox
                variant="success"
                message="Created successfully"
                autoHideDuration={5000}
            />
        );
    }

    return (
        <>
            {alertOutput}

            <div className={classes.backLink}>
                <Link component={RouterLink} to="/projects">
                    <KeyboardArrowLeft />
                    Back to Projects
                </Link>
            </div>

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

                <DateAndTimePicker
                    onDateChangeHandler={onDateChangeHandler}
                    date={values.deadline}
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
            </form>
        </>
    );
}

export default CreateProject;