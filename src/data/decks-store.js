import { ReduceStore } from 'flux/utils';
import Dispatcher from './dispatcher';
import { List } from 'immutable';
import { DecksActionsTypes } from './decks-actions';

/**
 * Decks store.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return List();
  }

  reduce(state, action) {
    switch (action.type) {
    case DecksActionsTypes.FETCH_ALL_DECKS: return this._fetchAllDecks(action);
    case DecksActionsTypes.ADD_DECK: return this._addDeck(state, action);
    default: return state;
    }
  }

  _fetchAllDecks(action) {
    return action.decks;
  }

  _addDeck(state, action) {
    return state.push(action.deck);
  }

}

export default new DecksStore();
