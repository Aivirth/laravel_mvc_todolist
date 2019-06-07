import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
});

export default function MainNav(props) {
    const classes = useStyles();

    const navItems = (
        <div className={classes.list} role="presentation">
            <List>
                <ListItem button>
                    <ListItemText primary="test" />
                </ListItem>
                <ListItem button component={Link} to="/projects">
                    <ListItemText primary="Projects" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Drawer onClose={props.onClose} open={props.open}>
            {navItems}
        </Drawer>
    );
}
