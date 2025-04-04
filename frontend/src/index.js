import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoadingProvider } from "./utils/Context/LoadingContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
