import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';
import { OrderedMap } from 'immutable';
import Deck from '../../data/Deck';
import Card from '../../data/Card';

class UserDecksStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.ON_DECK_ADDED: return this.onDeckAdded(state, action);
      case Types.ON_DECK_CHANGED: return this.onDeckChanged(state, action);
      case Types.ON_DECK_REMOVED: return this.onDeckRemoved(state, action);
      case Types.ON_CARD_ADDED: return this.onCardAdded(state, action);
      case Types.ON_CARD_REMOVED: return this.onCardRemoved(state, action);
      default: return state;
    }
  }

  onDeckAdded(state, action) {
    const data = Object.assign({id: action.id}, action.data);
    return state.set(action.id, Deck(data));
  }

  onDeckChanged(state, action) {
    const deck = state.get(action.id).merge(action.data);
    return state.set(action.id, deck);
  }

  onDeckRemoved(state, action) {
    return state.remove(action.id);
  }

  onCardAdded(state, action) {
    let deck = state.get(action.deckId);
    let cards = deck.get('cards');
    cards = cards.set(action.id, Card(Object.assign({}, action.data, {id: action.id})));
    deck = deck.set('cards', cards);
    return state.set(deck.id, deck);
  }

  onCardRemoved(state, action) {
    let deck = state.get(action.deckId);
    let cards = deck.get('cards');
    cards = cards.remove(action.id);
    deck = deck.set('cards', cards);
    return state.set(deck.id, deck);
  }

}

export default new UserDecksStore();
