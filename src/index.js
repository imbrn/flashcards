import React from "react";
import { render } from "react-dom";
import "normalize.css";
import "./index.css";
import Root from "./Root";

render(
  React.createElement(Root),
  document.getElementById("root")
);
