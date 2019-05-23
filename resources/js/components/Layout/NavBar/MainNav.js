import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
            </List>
        </div>
    );

    return (
        <Drawer onClose={props.onClose} open={props.open}>
            {navItems}
        </Drawer>
    );
}
