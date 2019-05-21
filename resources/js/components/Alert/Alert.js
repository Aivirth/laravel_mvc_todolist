import React from "react";

export default function Alert(props) {
    const { style, message, title } = props;
    let alertStyle = "red";

    switch (style) {
        case "success":
            alertStyle = "green";
            break;
        case "warning":
            alertStyle = "orange";
            break;

        case "info":
            alertStyle = "blue";
            break;

        default:
            break;
    }

    return (
        <div
            className={`bg-${alertStyle}-100 border-${alertStyle}-500 text-${alertStyle}-700  border-l-4 p-4 mb-5 w-full`}
            role="alert"
        >
            <p className="font-bold">{title}</p>
            <p>{message}</p>
        </div>
    );
}
