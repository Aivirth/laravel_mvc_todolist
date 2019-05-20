import React from "react";
import ReactDOM from "react-dom";

import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
const App = () => {
    return (
        <div>
            <Layout>
                <Dashboard />
            </Layout>
        </div>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
