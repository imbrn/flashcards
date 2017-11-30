import { Map } from "immutable";
import types from "./actionsTypes";

const reducer = (state = Map(), action) => {
  switch(action.type) {
    case types.ADD_DECK: return addDeck(state, action);
    case types.REMOVE_DECK: return removeDeck(state, action);
    case types.UPDATE_DECK: return updateDeck(state, action);
    case types.ADD_CARD: return addCard(state, action);
    case types.REMOVE_CARD: return removeCard(state, action);
    case types.UPDATE_CARD: return updateCard(state, action);
    default: return state;
  }
};

const addDeck = (state, action) => {
  return state.set(action.deck.id, action.deck);
};

const removeDeck = (state, action) => {
  return state.remove(action.deck.id);
};

const updateDeck = (state, action) => {
  return state.set(action.deck.id, action.deck);
};

const addCard = (state, action) => {
  return changeDeckCards(state, action.card.deck.id, (cards) => {
    return cards.set(action.card.id, action.card);
  });
};

const removeCard = (state, action) => {
  return changeDeckCards(state, action.card.deck.id, (cards) => {
    return cards.remove(action.card.id);
  });
};

const updateCard = (state, action) => {
  return changeDeckCards(state, action.card.deck.id, (cards) => {
    return cards.set(action.card.id, action.card);
  });
};

const changeDeckCards = (state, deckId, changeFunction) => {
  let deck = state.get(deckId);
  let cards = deck.cards;
  cards = changeFunction(cards);
  deck = deck.set("cards", cards);
  return state.set(deckId, deck);
};

export default reducer;
