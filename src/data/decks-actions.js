import Service from './decks-service';
import Dispatcher from './dispatcher';

/**
 * Decks actions types.
 */
const Types = {
  FETCH_ALL_DECKS: 'FETCH_ALL_DECKS',
  ADD_DECK: 'ADD_DECK'
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

}

export default new DecksActions();
export {
  Types as DecksActionsTypes
};
