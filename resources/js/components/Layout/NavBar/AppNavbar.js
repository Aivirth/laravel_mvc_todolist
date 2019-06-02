import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "../../../axios";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import SearchResults from "./SearchResults";

import MainNav from "./MainNav";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 32
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200
            }
        }
    }
}));

export default function AppNavbar() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        isDrawerOpen: false
    });

    let [searchResults, setSearchResults] = React.useState([]);

    const toggleDrawer = event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, isDrawerOpen: !state.isOpen });
    };

    const resetDrawer = event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, isDrawerOpen: false });
    };

    const searchHandler = e => {
        if (e.target.value !== "") {
            axios
                .post("projects/search", { title: e.target.value })
                .then(res => {
                    setSearchResults(res.data);
                })
                .catch(err => console.log(err));
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={toggleDrawer}
                            onKeyDown={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Laravel React MVC
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                onChange={searchHandler}
                            />
                            <SearchResults results={searchResults.projects} />
                        </div>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

            <MainNav open={state.isDrawerOpen} onClose={resetDrawer} />
        </>
    );
}
