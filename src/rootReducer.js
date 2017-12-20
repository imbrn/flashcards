import { combineReducers } from "redux";
import userReducer from "./user";
import decksReducer from "./decks";
import cardsReducer from "./cards";

const rootReducer = combineReducers({
  user: userReducer,
  decks: decksReducer,
  cards: cardsReducer
});

export default rootReducer;
