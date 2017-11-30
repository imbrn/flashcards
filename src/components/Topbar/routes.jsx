/* eslint react/display-name: "off" */
import DecksTopbarActions from "../DecksTopbarActions";

const routes = {
  title: [
    {
      path: "/",
      exact: true,
      component: () => "My decks",
    },
  ],
  actions: [
    {
      path: "/",
      exact: true,
      component: DecksTopbarActions,
    },
  ],
};

export default routes;
