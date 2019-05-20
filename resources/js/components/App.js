import React from "react";
import ReactDOM from "react-dom";

import Layout from "./Layout/Layout";
const App = () => {
    return (
        <div>
            <Layout>Body</Layout>
        </div>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
