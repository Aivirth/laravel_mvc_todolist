import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { logOut } from "../../../redux/actions/exposedActions";

const Logout = props => {
    const logOutHandler = e => {
        e.preventDefault();

        props.logOut();
    };

    return (
        <Button onClick={logOutHandler} color="inherit">
            Logout
        </Button>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(logOut());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Logout);
