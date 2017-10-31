import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionsTypes.CHANGE_DECK: return action.deck;
      case ActionsTypes.ADD_CARD: return this._addCard(state, action);
      case ActionsTypes.DELETE_CARD: return this._deleteCard(state, action);
      case ActionsTypes.CHANGE_CARD: return this._changeCard(state, action);
      default: return state;
    }
  }

  _addCard(state, action) {
    return this._changeCards(state, cards => cards.set(action.card.id, action.card));
  }

  _removeCard(state, action) {
    return this._changeCards(state, cards => cards.remove(action.card.id));
  }

  _changeCard(state, action) {
    return this._changeCards(state, cards => cards.set(action.card.id, action.card));
  }

  _changeCards(state, changeFunction) {
    let deck = state;
    let cards = deck.cards;
    cards = changeFunction(cards);
    deck = deck.set('cards', cards);
    return deck;
  }

}

export default new Store();
