import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProjectActions from "./ProjectActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    }
}));

export default function ProjectsList(props) {
    const classes = useStyles();
    let [rows, setRows] = React.useState(null);

    React.useEffect(() => {
        const projects = props.projects;
        if (projects) {
            setRows([...projects]);
        }
    }, []);

    const handleRowDelete = rowId => {
        const updatedRows = [...rows].filter(row => row.id !== rowId);
        setRows(updatedRows);
    };

    let rowsOutput = null;
    let tableOutput = "Loading";

    if (rows) {
        rowsOutput = (
            <TableBody>
                {rows.map(row => {
                    let status = null;

                    if (new Date(row.deadline) > new Date()) {
                        status = "Normal";
                    }

                    if (new Date(row.deadline) < new Date()) {
                        status = "expired";
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
                                    onDelete={() => handleRowDelete(row.id)}
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

    return tableOutput;
}
