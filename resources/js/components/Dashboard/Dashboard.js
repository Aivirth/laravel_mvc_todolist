import React, { Component } from "react";
import axios from "axios";
import ProjectCard from "../Card/ProjectCard";

class Dashboard extends Component {
    state = {
        projects: null
    };

    componentDidMount() {
        console.log("mounted");
        this.fetchProjects();
    }

    fetchProjects = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/projects"
            );

            console.log(response.data.projects);

            this.setState({ projects: response.data.projects });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let projectsOutput = "loading...";

        if (this.state.projects) {
            projectsOutput = this.state.projects.map(project => (
                <div key={project.id} className="w-full lg:w-1/2">
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                    />
                </div>
            ));
        }

        return <div className="flex flex-wrap">{projectsOutput}</div>;
    }
}

export default Dashboard;
