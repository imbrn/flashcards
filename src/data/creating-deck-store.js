import { ReduceStore } from 'flux/utils';
import Types from './creating-deck-actions-types';
import AppDispatcher from './dispatcher';

/**
 * Store for managing creating deck action.
 */
class CreatingDeckStore extends ReduceStore {

  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.START_CREATING_DECK: return this._startCreatingDeck(state, action);
      case Types.STOP_DECK_CREATION: return this._stopDeckCreation(state, action);
      default: return state;
    }
  }

  _startCreatingDeck(state, action) {
    return true;
  }

  _stopDeckCreation(state, action) {
    return false;
  }

}

export default new CreatingDeckStore();
