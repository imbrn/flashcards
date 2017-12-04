import DecksPage from "../DecksPage";
import CreateDeckPage from "../CreateDeckPage";

const routes = [
  {
    path: "/",
    component: DecksPage,
    exact: true,
  },
  {
    path: "/decks/create",
    component: CreateDeckPage,
    exact: true,
  },
];

export default routes;
