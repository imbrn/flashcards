import DecksPage from "../DecksPage";
import CreateDeckPage from "../CreateDeckPage";
import DeleteDeckPage from "../DeleteDeckPage";
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
    path: "/decks/:deckId/delete",
    component: DeleteDeckPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export default routes;
