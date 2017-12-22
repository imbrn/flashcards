import DecksPage from "../DecksPage";
import CreateDeckPage from "../CreateDeckPage";
import EditDeckPage from "../EditDeckPage";
import DeleteDeckPage from "../DeleteDeckPage";
import CardsPage from "../CardsPage";
import AddCardPage from "../AddCardPage";
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
    path: "/decks/:deckId/edit",
    component: EditDeckPage,
    exact: true
  },
  {
    path: "/decks/:deckId/delete",
    component: DeleteDeckPage,
    exact: true
  },
  {
    path: "/decks/:deckId/cards",
    component: CardsPage,
    exact: true
  },
  {
    path: "/decks/:deckId/cards/add",
    component: AddCardPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export default routes;
