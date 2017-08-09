import { OrderedMap } from 'immutable';
import Deck from './deck';
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
    return new Promise(resolve => {
      if (this._decks.has(deckId)) {
        resolve(this._doRemoveDeck(deckId));
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
    return Promise.resolve(this._decks.toList());
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
    return this._composition.addDeck(deck).then(() => {
      this._persist();
      return deck;
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
    const decksJson = window.localStorage.getItem(LocalStorageEngine.decksKey);
    if (decksJson) {
      return OrderedMap(this._convertObjectToDecks(JSON.parse(decksJson)));
    } else {
      return OrderedMap();
    }
  }

  _convertObjectToDecks(decksObject) {
    const decks = {};
    decksObject.forEach(deck => {
      decks[deck.id] = new Deck(deck);
    });
    return decks;
  }

  _loadLastDeckId() {
    const lastDeckIdJson = window.localStorage.getItem(LocalStorageEngine.lastDeckIdKey);
    if (lastDeckIdJson) {
      return parseInt(lastDeckIdJson);
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
    window.localStorage.setItem(LocalStorageEngine.decksKey, decksAsJson);
  }

  _decksToJson() {
    return JSON.stringify(this._composition.decks.toArray());
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
  case 'development':
    return new InMemoryStorageEngine();
  case 'production':
    return new LocalStorageEngine();
  }
}

export default new DecksService();
export {
  InMemoryStorageEngine,
  LocalStorageEngine,
  FakeLocalStorage
};
