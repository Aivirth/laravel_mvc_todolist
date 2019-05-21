import React, { Component } from "react";
import axios from "axios";
import ProjectCard from "../Card/ProjectCard";
import Alert from "../Alert/Alert";

class Dashboard extends Component {
    state = {
        projects: null,
        errors: null
    };

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/projects"
            );

            this.setState({ projects: response.data.projects });
        } catch (error) {
            this.setState({ errors: error });
        }
    };

    render() {
        let projectsOutput = "loading...";
        const { projects, errors } = this.state;

        if (projects) {
            projectsOutput = projects.map(project => (
                <div key={project.id} className="w-full lg:w-1/2">
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        id={project.id}
                    />
                </div>
            ));
        }

        if (errors) {
            projectsOutput = (
                <Alert
                    title={errors.response.statusText}
                    message={errors.message}
                />
            );
        }

        return <div className="flex flex-wrap">{projectsOutput}</div>;
    }
}

export default Dashboard;
