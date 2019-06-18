import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AlertBox from "../Alert/AlertBox";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions/exposedActions";

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

function Login(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: "",
        password: ""
    });

    // const [errors, setErrors] = React.useState(null);

    useEffect(() => {
        if (props.user) {
            props.history.push("/");
        }
    });

    const { errors, user } = props;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const submitHandler = e => {
        e.preventDefault();

        props.logIn(values);
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

        //     // alertOutput = (
        //     //     <AlertBox
        //     //         variant="error"
        //     //         message={errors.data.message}
        //     //         autoHideDuration={5000}
        //     //     />
        //     // );
    }

    if (user) {
        alertOutput = (
            <AlertBox
                variant="success"
                message="Login successful"
                autoHideDuration={5000}
            />
        );
    }

    return (
        <>
            {alertOutput}

            <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <TextField
                    onChange={handleChange("email")}
                    label="Email"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    autoComplete="email"
                    fullWidth
                />

                <TextField
                    onChange={handleChange("password")}
                    label="Password"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    type="password"
                    fullWidth
                    autoComplete="password"
                />

                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        errors: state.auth.errors,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: credentials => {
            dispatch(logIn(credentials));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
