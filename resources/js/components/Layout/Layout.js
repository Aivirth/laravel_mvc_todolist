import React, { useEffect } from "react";
import AppNavbar from "./NavBar/AppNavbar";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { fetchUserFromToken } from "../../redux/actions/exposedActions";

function Layout(props) {
    useEffect(() => {
        props.fetchUserFromToken();
    }, []);

    return (
        <>
            <AppNavbar />
            <Container maxWidth="lg">{props.children}</Container>
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
