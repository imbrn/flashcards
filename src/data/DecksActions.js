import Service from './DecksService';
import Dispatcher from './Dispatcher';

/**
 * Decks actions types.
 */
const Types = {
  FETCH_ALL_DECKS: 'FETCH_ALL_DECKS',
  ADD_DECK: 'ADD_DECK',
  UPDATED_DECK: 'UPDATE_DECK',
  FETCH_DECK: 'FETCH_DECK'
};

/**
 * Decks actions.
 */
class DecksActions {

  fetchAllDecks() {
    Service.fetchAllDecks().then(decks => {
      Dispatcher.dispatch({
        type: Types.FETCH_ALL_DECKS,
        decks
      });
    });
  }

  addDeck(deck) {
    Service.addDeck(deck).then(added => {
      Dispatcher.dispatch({
        type: Types.ADD_DECK,
        deck: added
      });
    });
  }

  updateDeck(deck) {
    Service.updateDeck(deck).then(updated => {
      Dispatcher.dispatch({
        type: Types.UPDATE_DECK,
        deck: updated
      });
    });
  }

  fetchDeckById(deckId) {
    Service.fetchDeckById(deckId).then(deck => {
      Dispatcher.dispatch({
        type: Types.FETCH_DECK,
        deck
      });
    }).catch(() => {
      Dispatcher.dispatch({
        type: Types.FETCH_DECK,
        deck: null
      });
    });
  }

}

export default new DecksActions();
export {
  Types as DecksActionsTypes
};
