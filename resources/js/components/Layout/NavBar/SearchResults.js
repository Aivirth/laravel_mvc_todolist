import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import { Link as RouterLink } from "react-router-dom";

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
                            <RouterLink to={`/projects/${result.id}`}>
                                <ListItemText primary={result.title} />
                            </RouterLink>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }

    return resultOutput;
}

export default SearchResults;
