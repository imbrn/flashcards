import { combineReducers } from "redux";
import authReducer from "./auth";
import decksReducer from "./decks";

const rootReducer = combineReducers({
  auth: authReducer,
  decks: decksReducer
});

export default rootReducer;
