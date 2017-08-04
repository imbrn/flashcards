import { OrderedMap } from 'immutable';
import Deck from '../deck-record';

const DECKS_KEY = 'decks';
const LAST_DECK_ID_KEY = 'last_deck_id';

/**
 * Basic decks service. It uses a simple persistence for storing decks.
 */
class BasicDecksService {

  constructor(persistence) {
    this._persistence = persistence;
    this._load();
  }

  saveDeck(deck) {
    return this._persistDeck(deck);
  }

  _persistDeck(deck) {
    if (deck instanceof Deck) {
      return this._updateDeck(deck);
    } else if (deck.id !== undefined && deck.id !== 0) {
      return this._mergeData(deck);
    } else {
      return this._insertDeck(deck);
    }
  }

  _insertDeck(deck) {
    if (this._validateDeck(deck)) {
      return this._insertValidDeck(deck);
    } else {
      throw new Error('Invalid deck');
    }
  }

  _validateDeck(deck) {
    return deck.name && deck.name.trim().length > 0;
  }

  _insertValidDeck(deck) {
    deck = new Deck({id: this._nextDeckId(), ...deck});
    this._decks = this._decks.set(deck.get('id'), deck);
    this._persist();
    return deck;
  }

  _updateDeck(deck) {
    if (this._validateDeck(deck)) {
      return this._updateValidDeck(deck);
    } else {
      throw new Error('Invalid deck');
    }
  }

  _updateValidDeck(deck) {
    this._decks = this._decks.set(deck.get('id'), deck);
    this._persist();
    return deck;
  }

  _mergeData(deckData) {
    const deck = this._decks.get(deckData.id).merge(deckData);
    return this._updateDeck(deck);
  }

  _mergetValidDeck(deckData) {
    let deck = this._decks.get(deckData.id);
    delete deckData.id;
    deck = deck.merge(deckData);
    return deck;
  }

  deleteDeck(deckId) {
    if (this._decks.has(deckId)) {
      return this._removeDeck(deckId);
    } else {
      throw new Error('The specified deck is not added.');
    }
  }

  _removeDeck(deckId) {
    this._decks = this._decks.delete(deckId);
    this._persist();
    return deckId;
  }

  _load() {
    if (this._persistence) {
      this._decks = this._loadDecks();
      this._lastDeckId = this._loadLastId();
    } else {
      this._decks = OrderedMap();
      this._lastDeckId = 0;
    }
  }

  _loadDecks() {
    const decksStr = this._persistence.get(DECKS_KEY);
    if (decksStr) {
      return OrderedMap(JSON.parse(decksStr));
    } else {
      return OrderedMap();
    }
  }

  _loadLastId() {
    const lastIdStr = this._persistence.get(LAST_DECK_ID_KEY);
    if (lastIdStr) {
      return parseInt(lastIdStr, 10);
    } else {
      return 0;
    }
  }

  _persist() {
    if (this._persistence) {
      this._persistDecks();
      this._persistLastDeckId();
    }
  }

  _persistDecks() {
    this._persistence.set(DECKS_KEY, JSON.stringify(this._decks.toObject()));
  }

  _persistLastDeckId() {
    this._persistence.set(LAST_DECK_ID_KEY, this._lastDeckId);
  }

  fetchAllDecks() {
    return this._decks;
  }

  _nextDeckId() {
    return ++this._lastDeckId;
  }

}

/*
Abstraction for local storage.
*/
class Persistence {
  set(id, value) { throw new Error('Not implemented yet.'); }
  get(id) { throw new Error('Not implemented yet.'); }
}

/*
In memory local storage implementation.
*/
class InMemoryPersistence extends Persistence {

  constructor() {
    super();
    this._data = {};
  }

  set(id, value) {
    this._data[id] = value;
  }

  get(id) {
    return this._data[id];
  }

}

/*
Implementation of local storage which works with browsers.
 */
class BrowserPersistence extends Persistence {

  set(id, value) {
    if (window.localStorage)
      window.localStorage.setItem(id, value);
  }

  get(id) {
    if (window.localStorage)
      return window.localStorage.getItem(id);
  }

}

export {
  BasicDecksService,
  InMemoryPersistence,
  BrowserPersistence
}
