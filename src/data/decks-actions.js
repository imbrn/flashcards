import DecksDispatcher from "./decks-dispatcher";
import Types from './decks-actions-types';

const Actions = {
  
  addDeck(name, description) {
    DecksDispatcher.dispatch({
      type: Types.ADD_DECK,
      name,
      description
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
