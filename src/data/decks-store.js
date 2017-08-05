import { ReduceStore } from 'flux/utils';
import AppDispatcher from './dispatcher';
import Types from './decks-actions-types';
import { OrderedMap } from 'immutable';

/**
 * Decks store.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
    case Types.ON_DECKS_LOADED: return this._loadDecks(state, action);
    case Types.ADD_DECK: return this._addDeck(state, action);
    case Types.EDIT_DECK: return this._editDeck(state, action);
    case Types.DELETE_DECK: return this._deleteDeck(state, action);
    case Types.RESET_DECK: return this._resetDecks(state);
    default: return state;
    }
  }

  _loadDecks(state, action) {
    return OrderedMap(action.decks);
  }

  _addDeck(state, action) {
    return state.set(action.deck.id, action.deck);
  }

  _editDeck(state, action) {
    return state.set(action.deck.id, action.deck);
  }

  _deleteDeck(state, action) {
    return state.delete(action.deckId);
  }

  _resetDecks(state) {
    return state.clear();
  }

}

export default new DecksStore();
export {
  DecksStore
};
