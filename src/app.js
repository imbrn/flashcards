import React from "react";
import { render } from "react-dom";

render(
  <div>Application!</div>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}