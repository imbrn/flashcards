import { ReduceStore } from 'flux/utils';
import Dispatcher from './dispatcher';
import { OrderedMap } from 'immutable';
import { DecksActionsTypes } from './decks-actions';

/**
 * Decks store.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
    case DecksActionsTypes.FETCH_ALL_DECKS: return this.fetchAllDecks(action);
    case DecksActionsTypes.ADD_DECK: return this.addDeck(state, action);
    case DecksActionsTypes.UPDATED_DECK: return this.updateDeck(state, action);
    default: return state;
    }
  }

  fetchAllDecks(action) {
    return action.decks;
  }

  addDeck(state, action) {
    return state.set(action.deck.id, action.deck);
  }

  updateDeck(state, action) {
    return state.set(action.deck.id, action.deck);
  }

}

export default new DecksStore();
