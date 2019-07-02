import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AlertBox from "../Alert/AlertBox";
import DateAndTimePicker from "../UI/DateAndTimePicker";
import { formatDateToSQLFormat } from "../../helpers";
import { connect } from "react-redux";
import BackTo from "../UI/BackTo";
import { createProject } from "../../redux/actions/exposedActions";

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: theme.spacing(8)
    },
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

function CreateProject(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        deadline: new Date().toISOString().slice(0, 19)
    });

    const [errors, setErrors] = React.useState(null);
    const [createSuccess, setCreateSuccess] = React.useState(null);

    const onDateChangeHandler = date => {
        setValues({ ...values, deadline: date });
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const submitHandler = e => {
        e.preventDefault();
        const correctedValues = { ...values };
        correctedValues.deadline = formatDateToSQLFormat(
            correctedValues.deadline
        );

        props.createProject(correctedValues);
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

            <BackTo link="/projects" text="Back to projects" />

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

const mapDispatchToProps = dispatch => {
    return {
        createProject: ({ title, description, deadline }) => {
            dispatch(createProject({ title, description, deadline }));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateProject);
