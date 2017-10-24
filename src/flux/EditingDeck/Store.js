import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import { Map } from 'immutable';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map({
      editing: false,
      deck: null
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionsTypes.START: return this._start(state, action);
      case ActionsTypes.UPDATE: return this._update(state, action);
      case ActionsTypes.FINISH: return this._finish(state);
      case ActionsTypes.CANCEL: return this._cancel(state);
      default: return state;
    }
  }

  _start(state, action) {
    return state
      .set('editing', true)
      .set('deck', action.deck);
  }

  _update(state, action) {
    return state.set('deck', action.deck);
  }

  _finish(state) {
    return state.set('editing', false);
  }

  _cancel(state) {
    return state.set('editing', false);
  }

}

export default new Store();
