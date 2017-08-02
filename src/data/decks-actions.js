import DecksDispatcher from "./decks-dispatcher";
import Types from './decks-actions-types';
import DecksAPI from './decks-api';

const Actions = {

  fetchDecks() {
    DecksAPI.fetchDecks().then(decks => {
      DecksDispatcher.dispatch({
        type: Types.DECKS_LOADED,
        decks
      });
    });
  },

  addDeck(name, description) {
    DecksAPI.addDeck({ name, description }).then(deck => {
      DecksDispatcher.dispatch({
        type: Types.ADD_DECK,
        deck
      });
    });
  },

  editDeck(id, data) {
    DecksDispatcher.dispatch({
      type: Types.EDIT_DECK,
      id,
      data
    });
  },

  deleteDeck(id) {
    DecksDispatcher.dispatch({
      type: Types.DELETE_DECK,
      id
    });
  },

  addCard(id, front, back) {
    DecksDispatcher.dispatch({
      type: Types.ADD_CARD,
      id,
      front,
      back
    });
  },

  startCreatingDeck() {
    DecksDispatcher.dispatch({
      type: Types.START_CREATING_DECK
    });
  },

  stopCreatingDeck() {
    DecksDispatcher.dispatch({
      type: Types.STOP_CREATING_DECK
    })
  }

}

export default Actions;
