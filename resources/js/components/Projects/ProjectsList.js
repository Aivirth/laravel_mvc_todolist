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
    const rows = props.projects;

    console.log(props);
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
                    <TableRow key={row.title}>
                        <TableCell component="th" scope="row">
                            {row.title}
                        </TableCell>
                        <TableCell align="right">{row.created_at}</TableCell>
                        <TableCell align="right">{row.updated_at}</TableCell>
                        <TableCell align="right">
                            <ProjectActions projectId={row.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
