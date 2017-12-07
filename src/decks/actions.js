import types from "./actionsTypes";

const startLoadingInitialDecks = () => {
  return {
    type: types.START_LOADING_INITIAL_DECKS
  };
};

const loadInitialDecks = decks => {
  return {
    type: types.LOAD_INITIAL_DECKS,
    decks
  };
};

const addDeck = deck => {
  return {
    type: types.ADD_DECK,
    deck
  };
};

const removeDeck = deck => {
  return {
    type: types.REMOVE_DECK,
    deck
  };
};

const updateDeck = deck => {
  return {
    type: types.UPDATE_DECK,
    deck
  };
};

const addCard = card => {
  return {
    type: types.ADD_CARD,
    card
  };
};

const removeCard = card => {
  return {
    type: types.REMOVE_CARD,
    card
  };
};

const updateCard = card => {
  return {
    type: types.UPDATE_CARD,
    card
  };
};

export default {
  startLoadingInitialDecks,
  loadInitialDecks,
  addDeck,
  removeDeck,
  updateDeck,
  addCard,
  removeCard,
  updateCard
};
