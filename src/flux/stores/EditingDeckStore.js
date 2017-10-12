import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';
import { Map } from 'immutable';

class EditingDeckStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map({
      isEditing: false,
      before: null,
      after: null
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.EDITING_DECK_START: return this.start(state, action);
      case Types.EDITING_DECK_UPDATE_DECK: return this.updateDeck(state, action);
      case Types.EDITING_DECK_FINISH: return this.finish(state);
      case Types.EDITING_DECK_CANCEL: return this.cancel(state);
      default: return state;
    }
  }

  start(state, action) {
    return state
      .set('isEditing', true)
      .set('before', action.deck)
      .set('after', action.deck);
  }

  updateDeck(state, action) {
    return state.set('after', action.deck);
  }

  finish(state) {
    return state
      .set('isEditing', false)
      .set('before', null)
      .set('after', null);
  }

  cancel(state) {
    return state
      .set('isEditing', false)
      .set('before', null)
      .set('after', null);
  }

}

export default new EditingDeckStore();
