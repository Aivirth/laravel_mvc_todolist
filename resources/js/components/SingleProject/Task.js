import React from "react";

export default function Task(props) {
    const { title, description, is_completed, created_at, updated_at } = props;

    const status = is_completed == 0 ? "not completed" : "completed";

    return (
        <div>
            <p>{title}</p>
            <p>D :{description}</p>
            <p>{created_at}</p>
            <p>{updated_at}</p>
            <p>{status}</p>
        </div>
    );
}
