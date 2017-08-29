import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { DecksActionsTypes } from './DecksActions';

/**
 * Only one deck store.
 */
class DeckModelStore extends ReduceStore {
  
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
    case DecksActionsTypes.FETCH_DECK: return this.fetchDeck(action);
    default: return state;
    }
  }

  fetchDeck(action) {
    return action.deck;
  }

}

export default new DeckModelStore();
