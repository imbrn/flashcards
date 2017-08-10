import { ReduceStore } from 'flux/utils';
import Dispatcher from './dispatcher';
import { DecksActionsTypes } from './decks-actions';

/**
 * Only one deck store.
 */
class DeckStore extends ReduceStore {
  
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
    case DecksActionsTypes.FETCH_DECK: return this._fetchDeck(action);
    default: return state;
    }
  }

  _fetchDeck(action) {
    return action.deck;
  }

}

export default new DeckStore();
