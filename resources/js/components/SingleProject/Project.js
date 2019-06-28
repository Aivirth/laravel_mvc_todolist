import React, { Component } from "react";
import axios from "../../axios";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { KeyboardArrowLeft } from "@material-ui/icons";
import Alert from "../Alert/Alert";
import Typography from "@material-ui/core/Typography";
import SimpleCircularProgress from "../UI/Progress/SimpleCircularProgress";
import { withStyles } from "@material-ui/styles";
import TasksList from "../Task/TasksList";
import { connect } from "react-redux";
import {
    fetchSingleProject,
    initTasks
} from "../../redux/actions/exposedActions";
import Box from "@material-ui/core/Box";

const styles = {
    root: {
        width: "100%",
        marginBottom: "2.5rem"
    },
    backLink: {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px"
    },
    backLink__text: {
        display: "inline-block"
    },

    backLink__anchor: {
        display: "flex",
        alignItems: "center"
    },
    project: {
        marginBottom: "2rem"
    }
};

class Project extends Component {
    state = {
        project: null,
        errors: null
    };

    componentDidMount() {
        const { access_token, user } = this.props.auth;
        const { fetchProject, tasks, initTasks } = this.props;

        if (access_token) {
            fetchProject(this.props.match.params.project);
        } else {
            this.props.history.push("/login");
        }
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
        const { project, errors } = this.props;
        const { classes } = this.props;

        if (errors) {
            console.log(errors.response);
            // projectOutput = (
            //     <Alert
            //         title={errors.response.statusText}
            //         message={errors.message}
            //     />
            // );
        }

        if (project) {
            projectOutput = (
                <div key={project.id} className={classes.root}>
                    <Box
                        boxShadow={2}
                        bgcolor="background.paper"
                        p={2}
                        m={1}
                        className={classes.project}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            {project.title}
                        </Typography>
                        <p>Description : {project.description}</p>
                        <p>Created : {project.created_at}</p>
                        <p>Last Updated : {project.updated_at}</p>
                    </Box>

                    <TasksList onUpdateHandler={this.fetchProject} />
                </div>
            );
        }
        return (
            <>
                <div className={classes.backLink}>
                    <Link
                        component={RouterLink}
                        to="/projects"
                        className={classes.backLink__anchor}
                    >
                        <KeyboardArrowLeft />
                        Back to Projects
                    </Link>
                </div>
                {projectOutput}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        project: state.projects.currentProject,
        errors: state.projects.errors,
        tasks: state.tasks.currentTasks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProject: projectId =>
            Promise.resolve(dispatch(fetchSingleProject(projectId))).then(() =>
                dispatch(initTasks())
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Project));
