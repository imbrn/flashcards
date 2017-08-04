import { ReduceStore } from 'flux/utils';
import Types from './decks-actions-types';
import DecksDispatcher from './decks-dispatcher';

/**
 * Store for managing creating deck action.
 */
class CreatingDeckStore extends ReduceStore {

  constructor() {
    super(DecksDispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.START_CREATING_DECK: return true;
      case Types.STOP_CREATING_DECK: return false;
      default: return state;
    }
  }

}

export default new CreatingDeckStore();
