import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./SingleProject/Project";
import CreateProject from "./Form/CreateProject";
import EditProject from "./Form/EditProject";
import Login from "./Form/Login";
import Register from "./Form/Register";
import { Provider } from "react-redux";
import store from "../redux/store";
import PrivateRoute from "../PrivateRoute";
import StartMenu from "../components/StartMenu/StartMenu";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <React.Fragment>
                        <CssBaseline />
                        <Layout>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route
                                    exact
                                    path="/register"
                                    component={Register}
                                />
                                <PrivateRoute
                                    exact
                                    path="/projects"
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path="/projects/create"
                                    component={CreateProject}
                                />
                                <PrivateRoute
                                    exact
                                    path="/projects/:project/edit"
                                    component={EditProject}
                                />
                                <PrivateRoute
                                    exact
                                    path="/projects/:project"
                                    component={Project}
                                />
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={StartMenu}
                                />
                            </Switch>
                        </Layout>
                    </React.Fragment>
                </MuiThemeProvider>
            </Router>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
