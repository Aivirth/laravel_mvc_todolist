import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "../Card/ProjectCard";
import Alert from "../Alert/Alert";
import { mergeClasses } from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
});

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
        const { classes } = this.props;
        const { projects, errors } = this.state;

        if (projects) {
            projectsOutput = projects.map(project => (
                <Grid item xs={6} key={project.id}>
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        id={project.id}
                    />
                </Grid>
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

        return (
            <>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {projectsOutput}
                    </Grid>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(Dashboard);
