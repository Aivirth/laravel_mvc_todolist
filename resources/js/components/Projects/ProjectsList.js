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

function createData(name, calories, fat, id) {
    return { name, calories, fat, id };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 1),
    createData("Ice cream sandwich", 237, 9.0, 2),
    createData("Eclair", 262, 16.0, 3),
    createData("Cupcake", 305, 3.7, 4),
    createData("Gingerbread", 356, 16.0, 5)
];

export default function ProjectsList(props) {
    const classes = useStyles();

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Deadline</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">
                            <ProjectActions projectId={row.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
