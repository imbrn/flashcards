import types from "./actionsTypes";

const addDeck = (deck) => {
  return {
    type: types.ADD_DECK,
    deck,
  };
};

const removeDeck = (deck) => {
  return {
    type: types.REMOVE_DECK,
    deck,
  };
};

const updateDeck = (deck) => {
  return {
    type: types.UPDATE_DECK,
    deck,
  };
};

const addCard = (card) => {
  return {
    type: types.ADD_CARD,
    card,
  };
};

const removeCard = (card) => {
  return {
    type: types.REMOVE_CARD,
    card,
  };
};

const updateCard = (card) => {
  return {
    type: types.UPDATE_CARD,
    card,
  };
};

export default {
  addDeck,
  removeDeck,
  updateDeck,
  addCard,
  removeCard,
  updateCard,
};
