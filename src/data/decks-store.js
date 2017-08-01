import { ReduceStore } from 'flux/utils';
import DecksDispatcher from './decks-dispatcher';
import ActionsTypes from './decks-actions-types';

/**
 * Decks store.
 */
class DecksStore extends ReduceStore {

  constructor() {
    super(DecksDispatcher);
    this.nextId = 0;
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionsTypes.ADD_DECK: return this.addDeck(state, action);
      case ActionsTypes.EDIT_DECK: return this.editDeck(state, action);
      case ActionsTypes.DELETE_DECK: return this.deleteDeck(state, action);
      case ActionsTypes.ADD_CARD: return this.addCard(state, action);
      default: return state
    }
  }

  addDeck(state, action) {
    const newState = state.slice();
    newState.push({
      id: ++this.nextId,
      name: action.name,
      description: action.description,
      cards: []
    });
    return newState;
  }

  editDeck(state, action) {
    const newState = state.slice();
    const index = state.findIndex(deck => deck.id === action.id);
    if (index !== -1) {
      const newDeck = Object.assign({}, state[index], action.data);
      newState[index] = newDeck;
      return newState;
    }
    return state;
  }

  deleteDeck(state, action) {
    const index = state.findIndex(deck => deck.id === action.id);
    if (index !== -1) {
      const newState = state.slice();
      newState.splice(index, 1);
      return newState;
    }
    return state;
  }

  addCard(state, action) {
    const index = state.findIndex(deck => deck.id === action.id);
    if (index !== -1) {
      const deck = state[index];
      const cards = deck.cards ? deck.cards.slice() : [];
      cards.push({
        front: action.front,
        back: action.back
      });
      const newDeck = Object.assign({}, deck, { cards });
      const newState = state.slice();
      newState[index] = newDeck;
      return newState;
    }
    return state;
  }

}

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
      case ActionsTypes.START_CREATING_DECK: return true;
      case ActionsTypes.STOP_CREATING_DECK: return false;
      default: return state;
    }
  }

}

const decksStore = new DecksStore();
const creatingDeckStore = new CreatingDeckStore();

// exports

export default decksStore;
export {
  decksStore as DecksStore,
  creatingDeckStore as CreatingDeckStore
}
