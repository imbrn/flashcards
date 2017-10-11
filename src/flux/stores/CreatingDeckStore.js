import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';
import Deck from '../../data/Deck';

class CreatingDeckStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.CREATING_DECK_START: return Deck();
      case Types.CREATING_DECK_FINISH: return null;
      case Types.CREATING_DECK_UPDATE_DECK: return action.deck;
      case Types.CREATING_DECK_CANCEL: return null;
      default: return state;
    }
  }

}

export default new CreatingDeckStore();
