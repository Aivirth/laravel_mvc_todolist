import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Box from "@material-ui/core/Box";
import { Link } from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        color: "black",
        backgroundColor: theme.palette.background.paper,
        position: "absolute",
        bottom: 0,
        transform: "translateY(100%)",
        marginTop: theme.spacing(1)
    },
    listItem: {
        overflow: "hidden",
        whiteSspace: "nowrap",
        textOverflow: "ellipsis"
    }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SearchResults(props) {
    const classes = useStyles();
    const { results } = props;

    let resultOutput = null;

    if (results && results.length > 0) {
        resultOutput = (
            <Box className={classes.root} boxShadow={1}>
                <List component="nav">
                    {results.map(result => (
                        <ListItem
                            button
                            className={classes.listItem}
                            key={result.id}
                        >
                            <ListItemText primary={result.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }

    return resultOutput;
}

export default SearchResults;
