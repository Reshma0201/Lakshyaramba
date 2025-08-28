import {createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import Abp from "./App"; // make sure the path is correct
import "./index.css"; // optional

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Abp />
  </React.StrictMode>
);
