import React, { useEffect } from "react";
import AppNavbar from "./NavBar/AppNavbar";
import Footer from "./Footer";
import { connect } from "react-redux";
import { fetchUserFromToken } from "../../redux/actions/exposedActions";

function Layout(props) {
    useEffect(() => {
        props.fetchUserFromToken();
    }, []);

    return (
        <>
            <AppNavbar />
            <div className="container mx-auto">{props.children}</div>
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
