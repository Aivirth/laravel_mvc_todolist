import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import AlertBox from "../Alert/AlertBox";
import ProjectActions from "./ProjectActions";
import { red, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    chipWarning: {
        background: yellow["400"]
    },
    chipDanger: {
        background: red["400"],
        color: "white"
    }
}));

export default function ProjectsList(props) {
    const classes = useStyles();
    let [rows, setRows] = React.useState(null);
    const [errors, setErrors] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    React.useEffect(() => {
        const projects = props.projects;
        if (projects) {
            setRows([...projects]);
        }
    }, []);

    React.useEffect(() => {
        const projects = props.projects;
        if (projects) {
            setRows([...projects]);
        }
    });

    const handleRowDelete = (rowId, response, type) => {
        if (type === "success") {
            setSuccess(true);
            setErrors(false);

            const updatedRows = [...rows].filter(row => row.id !== rowId);
            setRows(updatedRows);
        } else {
            setErrors(response);
        }
    };

    let rowsOutput = null;
    let tableOutput = "Loading";
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

    if (rows) {
        rowsOutput = (
            <TableBody>
                {rows.map(row => {
                    let status = null;

                    if (new Date(row.deadline) > new Date()) {
                        status = <Chip label="Normal" />;
                    }

                    if (new Date(row.deadline) < new Date()) {
                        status = (
                            <Chip
                                label="expired"
                                className={classes.chipDanger}
                            />
                        );
                    }

                    return (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.deadline}</TableCell>
                            <TableCell align="right">{status}</TableCell>
                            <TableCell align="right">
                                <ProjectActions
                                    projectId={row.id}
                                    restResponse={handleRowDelete}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        );

        tableOutput = (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Deadline</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {rowsOutput}
            </Table>
        );
    }

    return (
        <>
            {alertOutput}
            {tableOutput}
        </>
    );
}
