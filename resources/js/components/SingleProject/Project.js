import React, { Component } from "react";
import axios from "../../axios";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { KeyboardArrowLeft } from "@material-ui/icons";
import Alert from "../Alert/Alert";
import Task from "./Task";
import Typography from "@material-ui/core/Typography";
import SimpleCircularProgress from "../UI/Progress/SimpleCircularProgress";
import { withStyles } from "@material-ui/styles";
import TasksList from "../Task/TasksList";
import { connect } from "react-redux";

const styles = {
    root: {
        width: "100%"
    },
    backLink: {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px"
    },
    backLink__text: {
        display: "inline-block"
    }
};

class Project extends Component {
    state = {
        project: null,
        errors: null
    };

    componentDidMount() {
        const { access_token, user } = this.props.auth;
        if (access_token) {
            this.fetchProject();
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
        const { project, errors } = this.state;
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
                    <Typography variant="h3" component="h1" gutterBottom>
                        {project.title}
                    </Typography>
                    <p>Description : {project.description}</p>
                    <p>Created : {project.created_at}</p>
                    <p>Last Updated : {project.updated_at}</p>
                    <hr
                        style={{
                            padding: "20px 0",
                            borderTop: "1px solid black",
                            height: "0"
                        }}
                    />
                    <p>Tasks</p>
                    <ul>
                        {project.tasks
                            ? project.tasks.map(task => (
                                  <li key={task.id}>
                                      <Task {...task} />
                                  </li>
                              ))
                            : null}
                    </ul>
                    <TasksList tasks={project.tasks} />
                </div>
            );
        }
        return (
            <>
                <div className={classes.backLink}>
                    <Link component={RouterLink} to="/projects">
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
        auth: state.auth
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Project));
