import React, { Component } from "react";
import axios from "../../axios";
import Alert from "../Alert/Alert";
import Task from "./Task";

export default class Project extends Component {
    state = {
        project: null,
        errors: null
    };

    componentDidMount() {
        this.fetchProject();
    }

    fetchProject = async () => {
        try {
            const currentProject = this.props.match.params.project;

            const response = await axios.get(`projects/${currentProject}`);

            this.setState({ project: response.data.projects });
        } catch (error) {
            this.setState({ errors: error });
        }
    };

    render() {
        let projectOutput = "Loading...";
        const { project, errors } = this.state;

        if (errors) {
            projectOutput = (
                <Alert
                    title={errors.response.statusText}
                    message={errors.message}
                />
            );
        }

        if (project) {
            projectOutput = (
                <div key={project.id}>
                    <p>{project.title}</p>
                    <p>{project.description}</p>
                    <p>{project.created_at}</p>
                    <p>{project.updated_at}</p>
                    <hr />
                    {project.tasks
                        ? project.tasks.map(task => (
                              <Task key={task.id} {...task} />
                          ))
                        : null}
                </div>
            );
        }
        return <div>{projectOutput}</div>;
    }
}
