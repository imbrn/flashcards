import "firebase/firestore";
import { initializeApp, firestore } from "firebase";
import config from "./config";

import auth from "./auth";
import decks from "./decks";
import cards from "./cards";

function initialize() {
  initializeApp(config);
  firestore().enablePersistence();
}

export default {
  initialize,
  auth,
  decks,
  cards
};
