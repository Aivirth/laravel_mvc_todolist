import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import axios from "../../axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AlertBox from "../Alert/AlertBox";
import { KeyboardArrowLeft } from "@material-ui/icons";
import DateAndTimePicker from "../UI/DateAndTimePicker";
import { formatDateToSQLFormat } from "../../helpers";
import { connect } from "react-redux";
import { updateProject } from "../../redux/actions/exposedActions";

import BackTo from "../UI/BackTo";

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
    },
    backLink: {
        display: "flex",
        alignItems: "center"
    },
    backLink__text: {
        display: "inline-block"
    }
}));

function EditProject(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        deadline: new Date().toISOString().slice(0, 19),
        project_id: null
    });

    const [errors, setErrors] = React.useState(null);
    const [createSuccess, setCreateSuccess] = React.useState(null);

    React.useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const currentProjectId = props.match.params.project;
            const response = await axios.get(`projects/${currentProjectId}`);
            setValues({
                deadline: response.data.projects.deadline,
                title: response.data.projects.title,
                description: response.data.projects.description,
                project_id: currentProjectId
            });
        } catch (error) {
            setErrors(error);
        }
    };

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

        props.updateProject(correctedValues);
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
                    value={values.title}
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
                    Edit
                </Button>
            </form>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        updateProject: ({ title, description, deadline, project_id }) => {
            dispatch(
                updateProject({ title, description, deadline, project_id })
            );
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditProject);
