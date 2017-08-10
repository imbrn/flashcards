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
    case DecksActionsTypes.SELECT_DECK: return this._selectDeck(action);
    default: return state;
    }
  }

  _selectDeck(action) {
    return action.deck;
  }

}

export default new DeckStore();
