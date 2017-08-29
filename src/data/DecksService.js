import { fromJS, List, OrderedMap } from 'immutable';
import DeckModel from './DeckModel';
import CardModel from './CardModel';
import config from '../config';

/**
 * Decks service.
 */
class DecksService {

  constructor() {
    this._engine = createDefaultEngine();
  }

  addDeck(deck) {
    return this._engine.addDeck(deck);
  }

  removeDeck(deckId) {
    return this._engine.removeDeck(deckId);
  }

  updateDeck(deck) {
    return this._engine.updateDeck(deck);
  }

  fetchDeckById(deckId) {
    return this._engine.fetchDeckById(deckId);
  }

  fetchAllDecks() {
    return this._engine.fetchAllDecks();
  }

  get engine() {
    return this._engine;
  }

}

/*
In memory storage engine.
*/
class InMemoryStorageEngine {

  constructor() {
    this.reset();
  }

  reset() {
    this._decks = OrderedMap();
    this._lastDeckId = 0;
  }

  validateDeck(deck) {
    return deck.name && deck.name.trim().length > 0;
  }

  addDeck(deck) {
    deck = this._buildDeck(deck);
    return new Promise((resolve, reject) => {
      if (this.validateDeck(deck)) {
        resolve(this._doAddDeck(deck));
      } else {
        reject('Invalid deck');
      }
    });
  }

  _buildDeck(deck) {
    return deck.set('id', this._nextDeckId());
  }

  _doAddDeck(deck) {
    this._decks = this._decks.set(deck.id.toString(), deck);
    return deck;
  }

  _nextDeckId() {
    return ++this._lastDeckId;
  }

  removeDeck(deckId) {
    deckId = deckId.toString();
    return new Promise((resolve, reject) => {
      if (this._decks.has(deckId)) {
        resolve(this._doRemoveDeck(deckId));
      } else {
        reject(`Not found deck with id: ${deckId}`);
      }
    });
  }

  _doRemoveDeck(deckId) {
    const removed = this._decks.get(deckId);
    this._decks = this._decks.remove(deckId);
    return removed;
  }

  updateDeck(deck) {
    return new Promise((resolve, reject) => {
      if (!this._decks.has(deck.id.toString())) {
        reject(`Not found deck with id: ${deck.id}`);
      } else if (!this.validateDeck(deck)) {
        reject('Invalid new deck');
      } else {
        resolve(this._doUpdateDeck(deck));
      }
    });
  }

  _doUpdateDeck(deck) {
    this._decks = this._decks.set(deck.id.toString(), deck);
    return deck;
  }
  
  fetchAllDecks() {
    return Promise.resolve(this._decks);
  }
  
  fetchDeckById(deckId) {
    deckId = deckId.toString();
    return Promise.resolve(this._decks.get(deckId));
  }

  get decks() {
    return this._decks;
  }

  get lastDeckId() {
    return this._lastDeckId;
  }

}

/*
Local storage engine.
*/
class LocalStorageEngine {

  constructor() {
    this._checkEnvironment();
    this._composition = new InMemoryStorageEngine();
    this._load();
  }

  _checkEnvironment() {
    if (!window || !window.localStorage)
      throw new Error('It doesn\'t have support to localStorage.');
  }

  addDeck(deck) {
    return this._composition.addDeck(deck).then(added => {
      this._persist();
      return added;
    });
  }

  removeDeck(deckId) {
    return this._composition.removeDeck(deckId).then(removed => {
      this._persist();
      return removed;
    });
  }

  fetchAllDecks() {
    return this._composition.fetchAllDecks();
  }

  fetchDeckById(deckId) {
    return this._composition.fetchDeckById(deckId);
  }

  _load() {
    this._composition._decks = this._loadDecks();
    this._composition._lastDeckId = this._loadLastDeckId();
  }

  _loadDecks() {
    const decksJson = LocalStorageEngine.localStorageDecks;
    if (decksJson) {
      return OrderedMap(this._convertObjectToDecks(JSON.parse(decksJson)));
    } else {
      return OrderedMap();
    }
  }

  _convertObjectToDecks(decksObject) {
    return fromJS(decksObject, (key, value) => {
      if (key === '') return value.toOrderedMap(); // Complete map
      if (key === 'cards') return List(value); // Only cards collection
      if (Number.isInteger(key)) return new CardModel(value); // Card item
      if (!isNaN(key)) return new DeckModel(value.toObject()); // Deck item
    });
  }

  _loadLastDeckId() {
    const lastDeckIdJson = LocalStorageEngine.localStorageLastDeckId;
    if (lastDeckIdJson) {
      return parseInt(lastDeckIdJson, 10);
    } else {
      return 0;
    }
  }

  _persist() {
    this._persistDecks();
    this._persistLastDeckId();
  }

  _persistDecks() {
    const decksAsJson = this._decksToJson();
    LocalStorageEngine.localStorageDecks = decksAsJson;
  }

  _decksToJson() {
    return JSON.stringify(this._composition.decks.toJS());
  }

  _persistLastDeckId() {
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, this._composition.lastDeckId);
  }

  updateDeck(deck) {
    return this._composition.updateDeck(deck).then(updated => {
      this._persist();
      return updated;
    });
  }

  get decksObject() {
    return this._composition.decks.toJS();
  }

  get decksJson() {
    return JSON.stringify(this.decksObject);
  }

  get lastDeckId() {
    return this._composition.lastDeckId;
  }
  
  static get decksKey() {
    return 'decks';
  }

  static get lastDeckIdKey() {
    return 'lastDeckId';
  }

  static get localStorageDecks() {
    return window.localStorage.getItem(LocalStorageEngine.decksKey);
  }

  static set localStorageDecks(value) {
    window.localStorage.setItem(LocalStorageEngine.decksKey, value);
  }

  static get localStorageLastDeckId() {
    return window.localStorage.getItem(LocalStorageEngine.lastDeckIdKey);
  }

}

/*
Fake window storage support.
*/
class FakeLocalStorage {

  constructor() {
    this.values = {};
  }

  setItem(key, value) {
    this.values[key] = value;
  }

  getItem(key) {
    return this.values[key];
  }

  clear() {
    this.values = {};
  }

}

/*
Factory method used to build an engine.
*/
function createDefaultEngine() {
  switch (config.env) {
  case 'test':
    return new InMemoryStorageEngine();
  case 'development':
  case 'production':
    return new LocalStorageEngine();
  default:
    throw new Error('Invalid enviroment');
  }
}

export default new DecksService();
export {
  InMemoryStorageEngine,
  LocalStorageEngine,
  FakeLocalStorage
};
