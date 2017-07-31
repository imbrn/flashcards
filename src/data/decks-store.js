import { ReduceStore } from 'flux/utils';
import DecksDispatcher from './decks-dispatcher';
import ActionsTypes from './decks-actions-types';

/**
 * Decks store.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(DecksDispatcher);
    this.nextId = 0;
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionsTypes.ADD_DECK: return this.addDeck(state, action);
      default: return state
    }
  }

  addDeck(state, action) {
    const newState = state.slice();
    newState.push({
      id: ++this.nextId,
      name: action.name,
      description: action.description
    });
    return newState;
  }

}

export default new DecksStore();
