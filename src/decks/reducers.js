import { OrderedMap } from "immutable";
import { combineReducers } from "redux";
import types from "./actionsTypes";
import { DecksInitialLoadingState } from "./models";

const loadingState = (state = DecksInitialLoadingState.NOT_LOADED, action) => {
  switch (action.type) {
    case types.START_LOADING_INITIAL_DECKS:
      return DecksInitialLoadingState.LOADING;
    case types.LOAD_INITIAL_DECKS:
      return DecksInitialLoadingState.LOADED;
    default:
      return state;
  }
};

const decks = (state = OrderedMap(), action) => {
  switch (action.type) {
    case types.LOAD_INITIAL_DECKS:
      return loadInitialDecks(state, action);
    case types.ADD_DECK:
      return addDeck(state, action);
    case types.REMOVE_DECK:
      return removeDeck(state, action);
    case types.UPDATE_DECK:
      return updateDeck(state, action);
    case types.ADD_CARD:
      return addCard(state, action);
    case types.REMOVE_CARD:
      return removeCard(state, action);
    case types.UPDATE_CARD:
      return updateCard(state, action);
    default:
      return state;
  }
};

const loadInitialDecks = (state, action) => {
  return OrderedMap(action.decks.map(deck => [deck.id, deck]));
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
  return changeDeckCards(state, action.card.deck.id, cards => {
    return cards.set(action.card.id, action.card);
  });
};

const removeCard = (state, action) => {
  return changeDeckCards(state, action.card.deck.id, cards => {
    return cards.remove(action.card.id);
  });
};

const updateCard = (state, action) => {
  return changeDeckCards(state, action.card.deck.id, cards => {
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

const reducer = combineReducers({
  loadingState,
  items: decks
});

export default reducer;
