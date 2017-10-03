import { ReduceStore } from 'flux/utils';
import OnDeckAddedAction from '../actions/OnDeckAddedAction';
import OnDeckRemovedAction from '../actions/OnDeckRemovedAction';
import OnDeckChangedAction from '../actions/OnDeckChangedAction';
import Dispatcher from '../dispatcher/Dispatcher';
import { Map } from 'immutable';

/**
 * Stores all the user decks.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map();
  }

  reduce(state, action) {
    switch (action.type) {
      case OnDeckAddedAction.type: return this.onDeckAdded(state, action);
      case OnDeckRemovedAction.type: return this.onDeckRemoved(state, action);
      case OnDeckChangedAction.type: return this.onDeckChanged(state, action);
      default: return state;
    }
  }

  onDeckAdded(state, action) {
    return state.set(action.id, { id: action.id, ...action.deck });
  }

  onDeckRemoved(state, action) {
    return state.remove(action.id);
  }

  onDeckChanged(state, action) {
    return state.set(action.id, { id: action.id, ...action.deck });
  }

}

export default new DecksStore();
