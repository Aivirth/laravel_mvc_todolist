import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./SingleProject/Project";
import CreateProject from "./Form/CreateProject";
import Login from "./Form/Login";
import { Provider } from "react-redux";
import store from "../redux/store";
import PrivateRoute from "../PrivateRoute";
import StartMenu from "../components/StartMenu/StartMenu";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <CssBaseline />
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={Login} />
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
                            path="/projects/:project"
                            component={Project}
                        />
                        <PrivateRoute exact path="/" component={StartMenu} />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
