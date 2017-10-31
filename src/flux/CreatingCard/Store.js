import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import Card from '../../model/Card';
import { Map } from 'immutable';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Map({
      creating: false,
      deck: null,
      card: Card()
    });
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionsTypes.START: return this._start(state, action);
      case ActionsTypes.UPDATE: return this._update(state, action);
      case ActionsTypes.FINISH: return this._finish(state);
      case ActionsTypes.CANCEL: return this._cancel(state);
      default: return state;
    }
  }

  _start(state, action) {
    return state
      .set('creating', true)
      .set('deck', action.deck)
      .set('card', Card());
  }

  _update(state, action) {
    return state.set('card', action.card);
  }

  _finish(state) {
    return state
      .set('creating', false)
      .set('deck', null)
      .set('card', Card());
  }

  _cancel(state) {
    return state
      .set('creating', false)
      .set('deck', null)
      .set('card', Card());
  }

}

export default new Store();
