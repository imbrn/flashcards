import actions from "./actions";
import services from "../services";

const startLoadingInitialDecks = actions.startLoadingInitialDecks;
const loadInitialDecks = actions.loadInitialDecks;
const addDeck = actions.addDeck;
const removeDeck = actions.removeDeck;
const updateDeck = actions.updateDeck;
const addCard = actions.addCard;
const removeCard = actions.removeCard;
const updateCard = actions.updateCard;

const requestCreateDeck = deckData => {
  return dispatch => {
    dispatch(actions.startCreatingDeck());

    services.currentUser
      .getDecks()
      .add(deckData)
      .then(() => {
        dispatch(actions.finishCreatingDeck(true));
      })
      .catch(error => {
        dispatch(actions.finishCreatingDeck(false, error));
      });
  };
};

export default {
  startLoadingInitialDecks,
  loadInitialDecks,
  requestCreateDeck,
  addDeck,
  removeDeck,
  updateDeck,
  addCard,
  removeCard,
  updateCard
};
