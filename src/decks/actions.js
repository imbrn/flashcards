import types from "./actionsTypes";

const updateDecks = decks => {
  return {
    type: types.UPDATE_DECKS,
    decks
  };
};

const finishCreateDeck = response => {
  return {
    type: types.FINISH_CREATE_DECK,
    response
  };
};

export default {
  updateDecks,
  finishCreateDeck
};
