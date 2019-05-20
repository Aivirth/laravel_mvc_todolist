import React from "react";
import AppNavbar from "./NavBar/AppNavbar";
import Footer from "./Footer";

export default function Layout(props) {
    return (
        <>
            <AppNavbar />
            <div className="container mx-auto">{props.children}</div>
            <Footer />
        </>
    );
}
