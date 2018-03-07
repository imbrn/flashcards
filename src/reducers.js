import { combineReducers } from "redux";
import * as Types from "./actionsTypes";

export const decks = (state = [], action) => {
  switch (action.type) {
    case Types.CREATE_DECK_SUCCESS:
      return [...state, action.deck];
    case Types.DELETE_DECK_SUCCESS: {
      const index = state.findIndex(it => it.id === action.deck.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case Types.UPDATE_DECK_SUCCESS: {
      const index = state.findIndex(it => it.id === action.deck.id);
      return [...state.slice(0, index), action.deck, ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};

export const cards = (state = []) => {
  return state;
};

export default combineReducers({
  decks,
  cards
});
