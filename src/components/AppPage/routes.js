import DecksPage from "../DecksPage";
import CreateDeckPage from "../CreateDeckPage";
import NotFoundPage from "../NotFoundPage";

const routes = [
  {
    path: "/",
    component: DecksPage,
    exact: true
  },
  {
    path: "/decks/create",
    component: CreateDeckPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export default routes;
