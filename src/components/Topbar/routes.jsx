/* eslint react/display-name: "off" */
import React from "react";
import { Redirect } from "react-router-dom";
import DecksTopbarActions from "../DecksTopbarActions";

const routes = {
  title: [
    {
      path: "/decks",
      exact: true,
      component: () => "My decks",
    },
    {
      path: "/",
      exact: true,
      component: () => <Redirect to="/decks" />,
    },
  ],
  actions: [
    {
      path: "/decks",
      exact: true,
      component: DecksTopbarActions,
    },
  ],
};

export default routes;
