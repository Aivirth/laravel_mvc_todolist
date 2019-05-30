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
import axios from "../../axios";

const ProjectActions = props => {
    const useStyles = makeStyles(theme => ({
        optionName: {
            marginLeft: theme.spacing(1)
        }
    }));
    const { projectId, restResponse } = props;
    const apiEndpoint = `projects/${projectId}`;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const deleteProjectHandler = e => {
        e.preventDefault();
        axios
            .delete(`${apiEndpoint}`)
            .then(restResponse(projectId, null, "success"))
            .catch(err => {
                restResponse(projectId, err.response.data, "failed");
            });
    };

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
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
