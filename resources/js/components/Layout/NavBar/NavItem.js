import React from "react";

export default function NavItem(props) {
    const { children, url } = props;
    return (
        <a
            href="#test"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
            {children}
        </a>
    );
}
