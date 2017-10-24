import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import { Map } from 'immutable';
import Deck from '../../model/Deck';
import Types from './ActionsTypes';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map({
      creating: false,
      deck: Deck()
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.START: return this._start(state);
      case Types.UPDATE: return this._update(state, action);
      case Types.FINISH: return this._finish(state);
      case Types.CANCEL: return this._cancel(state);
      default: return state;
    }
  }

  _start(state) {
    return state
      .set('creating', true)
      .set('deck', Deck());
  }

  _update(state, action) {
    return state.set('deck', action.deck);
  }

  _finish(state) {
    return state.set('creating', false);
  }

  _cancel(state) {
    return state.set('creating', false);
  }

}

export default new Store();
