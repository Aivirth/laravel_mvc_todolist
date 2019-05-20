import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return <div>React</div>;
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
