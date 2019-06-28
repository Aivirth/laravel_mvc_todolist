import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addTask } from "../../redux/actions/exposedActions";

function AddTask(props) {
    let [taskFields, setTaskFields] = useState({
        title: "",
        description: ""
    });
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleChange = name => event => {
        setTaskFields({ ...taskFields, [name]: event.target.value });
    };

    const onSubmitHandler = ({ title, description }) => {
        const project_id = props.currentProject.id;

        const taskData = {
            title,
            description,
            project_id
        };

        Promise.resolve(props.addTask(taskData)).then(() => {
            setTaskFields({
                title: "",
                description: ""
            });
        });
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                <i className="fas fa-plus-square" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new task to the project
                    </DialogContentText>

                    <TextField
                        onChange={handleChange("title")}
                        id="standard-dense"
                        label="Title"
                        margin="dense"
                        value={taskFields.title}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={taskFields.description}
                        onChange={handleChange("description")}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onSubmitHandler({ ...taskFields })}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const mapStateToProps = state => {
    return {
        currentProject: state.projects.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTask: ({ title, description, project_id }) => {
            dispatch(addTask({ title, description, project_id }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTask);
