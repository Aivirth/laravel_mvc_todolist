import React, { Component } from "react";
import axios from "../../axios";
import Alert from "../Alert/Alert";
import Task from "./Task";
import Typography from "@material-ui/core/Typography";
import SimpleCircularProgress from "../UI/Progress/SimpleCircularProgress";
import { withStyles } from "@material-ui/styles";

const styles = {
    root: {
        width: "100%"
    }
};

class Project extends Component {
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
        let projectOutput = (
            <div style={{ height: "40rem", width: "100%" }}>
                <SimpleCircularProgress />
            </div>
        );
        const { project, errors } = this.state;
        const { classes } = this.props;

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
                <div key={project.id} className={classes.root}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {project.title}
                    </Typography>
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

export default withStyles(styles)(Project);
