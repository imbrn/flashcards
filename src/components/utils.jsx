import React from "react";
import { Route } from "react-router-dom";

export function objectToRoute(obj, id) {
  return <Route {...obj} key={id} />;
}
