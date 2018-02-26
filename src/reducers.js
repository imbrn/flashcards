import { combineReducers } from "redux";

const decks = (state = []) => {
  return state;
};

const cards = (state = []) => {
  return state;
};

export default combineReducers({
  decks,
  cards
});
