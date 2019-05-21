import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./SingleProject/Project";

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/projects" component={Dashboard} />
                    <Route
                        exact
                        path="/projects/:project"
                        component={Project}
                    />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
