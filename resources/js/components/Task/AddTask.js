import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function AddTask(props) {
    //   const {
    //     onCloseHandler,
    //     dialogStatus,
    //     currentTaskId,
    //     onSubmitHandler
    // } = props;

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
                        onClick={() =>
                            onSubmitHandler({ currentTaskId, ...taskFields })
                        }
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddTask;
