import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";

ReactDOM.render(
    // <App />, 
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>,
    document.getElementById("root")
);
