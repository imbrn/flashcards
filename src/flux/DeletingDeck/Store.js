import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import { Map } from 'immutable';
import ActionsTypes from './ActionsTypes';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map({
      deleting: false,
      deck: null
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionsTypes.DELETE: return this._delete(state, action);
      case ActionsTypes.CONFIRM: return this._confirm(state);
      case ActionsTypes.CANCEL: return this._cancel(state);
      default: return state;
    }
  }

  _delete(state, action) {
    return state.set('deleting', true).set('deck', action.deck);
  }

  _confirm(state) {
    return state.set('deleting', false).set('deck', null);
  }

  _cancel(state) {
    return state.set('deleting', false).set('deck', null);
  }

}

export default new Store();
