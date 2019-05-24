import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Alert from "../Alert/Alert";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DashboardBox from "./DashboardBox";
import ProjectsList from "../Projects/ProjectsList";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    divider: {
        marginLeft: 15,
        marginRight: 15,
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

    AdapterLink = React.forwardRef((props, ref) => (
        <Link innerRef={ref} {...props} />
    ));

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
            projectsOutput = <ProjectsList projects={projects} />;
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
                <Box display="flex" alignItems="center">
                    <Typography variant="button" component="h3">
                        Dashboard
                    </Typography>
                    <span className={classes.divider}>|</span>
                    <Button
                        component={this.AdapterLink}
                        to="/projects/create"
                        variant="contained"
                        className={classes.button}
                        size="small"
                        color="primary"
                    >
                        Create new
                    </Button>
                </Box>

                <DashboardBox>{projectsOutput}</DashboardBox>
            </>
        );
    }
}

export default withStyles(styles)(Dashboard);
