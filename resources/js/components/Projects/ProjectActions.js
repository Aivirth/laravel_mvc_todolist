import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Fullscreen as FullscreenIcon,
    Create as CreateIcon
} from "@material-ui/icons/";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertBox from "../Alert/AlertBox";

const ProjectActions = props => {
    const useStyles = makeStyles(theme => ({
        optionName: {
            marginLeft: theme.spacing(1)
        }
    }));
    const { projectId } = props;
    const apiEndpoint = `projects/${projectId}`;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [errors, setErrors] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const deleteProjectHandler = e => {
        e.preventDefault();
        axios
            .delete(`http://127.0.0.1:8000/api/${apiEndpoint}`)
            .then(response => {
                setSuccess(true);
                setErrors(false);
            })
            .catch(err => {
                setErrors(err.response.data);
            });
    };

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    let alertOutput = null;

    if (errors) {
        alertOutput = (
            <AlertBox
                variant="error"
                message={errors.message}
                autoHideDuration={5000}
            />
        );
    }

    if (success) {
        alertOutput = (
            <AlertBox
                variant="success"
                autoHideDuration={5000}
                message="Deleted"
            />
        );
    }

    return (
        <>
            {alertOutput}
            <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: 200
                    }
                }}
            >
                <Link to={apiEndpoint}>
                    <MenuItem onClick={handleClose}>
                        <FullscreenIcon />
                        <Typography
                            className={classes.optionName}
                            variant="inherit"
                        >
                            View
                        </Typography>
                    </MenuItem>
                </Link>

                <Link to={`${apiEndpoint}/edit`}>
                    <MenuItem>
                        <CreateIcon />
                        <Typography
                            className={classes.optionName}
                            variant="inherit"
                        >
                            Edit
                        </Typography>
                    </MenuItem>
                </Link>

                <MenuItem onClick={deleteProjectHandler}>
                    <DeleteIcon />
                    <Typography
                        className={classes.optionName}
                        variant="inherit"
                    >
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProjectActions;
