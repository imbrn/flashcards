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

const startCreatingDeck = deckData => {
  return {
    type: types.START_CREATING_DECK,
    deckData
  };
};

const finishCreatingDeck = (success, error) => {
  return {
    type: types.FINISH_CREATING_DECK,
    success,
    error
  };
};

const startDeletingDeck = deck => {
  return {
    type: types.START_DELETING_DECK,
    deck
  };
};

const finishDeletingDeck = (success, error) => {
  return {
    type: types.FINISH_DELETING_DECK,
    success,
    error
  };
};

const startEditingDeck = deck => {
  return {
    type: types.START_EDITING_DECK,
    deck
  };
};

const finishEditingDeck = (success, error) => {
  return {
    type: types.FINISH_EDITING_DECK,
    success,
    error
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
  startCreatingDeck,
  finishCreatingDeck,
  startDeletingDeck,
  finishDeletingDeck,
  startEditingDeck,
  finishEditingDeck,
  addDeck,
  removeDeck,
  updateDeck,
  addCard,
  removeCard,
  updateCard
};
