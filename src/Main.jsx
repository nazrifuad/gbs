import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/css/normalize.css";
import "../src/css/styleguide.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
