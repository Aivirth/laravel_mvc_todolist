import React, { useState } from "react";
import axios from "../../axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function TaskDialog(props) {
    const {
        onCloseHandler,
        dialogStatus,
        currentTaskId,
        onSubmitHandler
    } = props;

    let [taskFields, setTaskFields] = useState({
        title: "",
        description: ""
    });

    const handleChange = name => event => {
        setTaskFields({ ...taskFields, [name]: event.target.value });
    };

    React.useEffect(() => {
        const taskId = currentTaskId;

        if (taskId) {
            axios
                .get(`tasks/${currentTaskId}`)
                .then(({ data }) => {
                    setTaskFields({
                        title: data.title,
                        description: data.description
                    });
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <Dialog
            open={dialogStatus}
            onClose={onCloseHandler}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
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
                <Button onClick={onCloseHandler} color="primary">
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
    );
}
