import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { withStyles } from "@material-ui/core/styles";
import Alert from "../Alert/Alert";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DashboardBox from "./DashboardBox";
import ProjectsList from "../Projects/ProjectsList";
import { connect } from "react-redux";
import { fetchProjects } from "../../redux/actions/exposedActions";

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
    // state = {
    //     projects: null,
    //     errors: null,
    //     jwt: null
    // };

    // componentDidMount() {
    //     if (this.state.jwt) {
    //         this.fetchProjects();
    //     } else {
    //         this.props.history.push("/login");
    //     }
    // }

    componentDidMount() {
        const {
            access_token,
            user,
            projects,
            errors,
            fetchProjects
        } = this.props;

        if (access_token) {
            fetchProjects();
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     const { access_token, user, projects, errors, fetchProjects } = props;

    //     if (access_token && user) {
    //         fetchProjects();
    //     }
    //     return null;
    // }

    AdapterLink = React.forwardRef((props, ref) => (
        <Link innerRef={ref} {...props} />
    ));

    render() {
        let projectsOutput = "loading...";
        const { classes } = this.props;
        const { projects, errors } = this.props;

        if (projects) {
            projectsOutput = <ProjectsList projects={projects} />;
        }

        if (errors) {
            // projectsOutput = (
            //     <Alert
            //         title={errors.response.statusText}
            //         message={errors.message}
            //     />
            // );

            console.log(errors);
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

const mapStateToProps = state => {
    return {
        access_token: state.auth.access_token,
        user: state.auth.user,
        errors: state.projects.errors,
        projects: state.projects.allProjects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => {
            dispatch(fetchProjects());
        }
    };
};

// export default withStyles(styles)(Dashboard);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dashboard));
