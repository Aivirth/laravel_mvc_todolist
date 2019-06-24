import React, { useEffect } from "react";
import AppNavbar from "./NavBar/AppNavbar";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { fetchUserFromToken } from "../../redux/actions/exposedActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "40rem"
    }
}));

function Layout(props) {
    const classes = useStyles();
    useEffect(() => {
        props.fetchUserFromToken();
    }, []);

    return (
        <>
            <AppNavbar />
            <Container className={classes.root} maxWidth="lg">
                {props.children}
            </Container>
            <Footer />
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserFromToken: () => {
            dispatch(fetchUserFromToken());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Layout);
