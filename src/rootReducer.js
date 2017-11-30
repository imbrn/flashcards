import { combineReducers } from "redux";
import authReducer from "./auth";
import cardsReducer from "./cards";

const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardsReducer,
});

export default rootReducer;

