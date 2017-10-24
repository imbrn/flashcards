import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import DecksActionsTypes from './ActionsTypes';
import CardsActionsTypes from '../Cards/ActionsTypes';
import { OrderedMap } from 'immutable';

class Store extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case DecksActionsTypes.ADD: return this._addDeck(state, action);
      case DecksActionsTypes.REMOVE: return this._removeDeck(state, action);
      case DecksActionsTypes.CHANGE: return this._changeDeck(state, action);
      case CardsActionsTypes.ADD: return this._addCard(state, action);
      case CardsActionsTypes.REMOVE: return this._removeCard(state, action);
      case CardsActionsTypes.CHANGE: return this._changeCard(state, action);
      default: return state;
    }
  }

  _addDeck(state, action) {
    return state.set(action.deck.id, action.deck);
  }

  _removeDeck(state, action) {
    return state.remove(action.deck.id);
  }

  _changeDeck(state, action) {
    let deck = state.get(action.deck.id);
    const cards = deck.cards;
    deck = deck.merge(action.deck).set('cards', cards);
    return state.set(deck.id, deck);
  }

  _addCard(state, action) {
    return this._changeCards(state, action.deckId, cards =>
      cards.set(action.card.id, action.card));
  }

  _removeCard(state, action) {
    return this._changeCards(state, action.deckId, cards =>
      cards.remove(action.card.id));
  }

  _changeCard(state, action) {
    return this._changeCards(state, action.deckid, cards =>
      cards.set(action.card.id, action.card));
  }

  _changeCards(state, deckId, call) {
    let deck = state.get(deckId);
    let cards = deck.get('cards');
    cards = call(cards);
    deck = deck.set('cards', cards);
    return state.set(deck.id, deck);
  }

}

export default new Store();
