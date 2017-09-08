/**
 * It contains all the server entities data and their relationship logic. It makes things easier 
 * for serialization. 
 * 
 * All business logic entities must be put in this container.
 */
class Data {

  constructor(js) {
    this.decks = value(js, 'decks', []);
    this.cards = value(js, 'cards', []);
    this.lastDeckId = value(js, 'lastDeckId', 0);
    this.lastCardId = value(js, 'lastCardId', 0);
  }

  insertDeck(data) {
    const deck = Deck(Object.assign({ cards:[] }, data, { id: ++this.lastDeckId }));
    this.decks.push(deck);
    return deck;
  }

  deleteDeck(id) {
    const index = this.decks.findIndex(deck => deck.id === id);
    const deck = this.decks.splice(index, 1)[0];
    deck.cards.forEach(id => this._removeCard(id));
    return deck;
  }

  updateDeck(deckId, data) {
    const index = this.decks.findIndex(deck => deck.id === deckId);
    const current = this.decks[index];
    const updated = Deck(Object.assign({}, current, data, { id: current.id, cards: current.cards }));
    this.decks[index] = updated;
    return updated;
  }

  findDeckById(deckId) {
    return this.decks.find(deck => deck.id === deckId);
  }

  findAllDecks() {
    return this.decks;
  }
  
  insertCard(deckId, data) {
    const deck = this.decks.find(deck => deck.id === deckId);
    const card = Card(Object.assign({}, data, { id: ++this.lastCardId, deck: deck.id }));
    deck.cards.push(card.id);
    this.cards.push(card);
    return card;
  }

  deleteCard(cardId) {
    const card = this._removeCard(cardId);
    this._unlinkCardFromDeck(card);
    return card;
  }

  updateCard(cardId, data) {
    const index = this.cards.findIndex(card => card.id === cardId);
    const current = this.cards[index];
    const updated = Card(Object.assign({}, current, data, { id: current.id, deck: current.deck }));
    this.cards[index] = updated;
    return updated;
  }

  findCardById(cardId) {
    return this.cards.find(card => card.id === cardId);
  }

  findAllCards(deckId) {
    return this.cards.filter(card => card.deck === deckId);
  }
  
  _removeCard(id) {
    const index = this.cards.findIndex(card => card.id === id);
    return this.cards.splice(index, 1)[0];
  }

  _unlinkCardFromDeck(card) {
    const deck = this.decks.find(it => it.id === card.deck);
    const index = deck.cards.findIndex(id => card.id === id);
    deck.cards.splice(index, 1);
  }
  
  toJs() {
    return this;
  }

}

/*
Utilitary function to build a valid Deck.
*/
function Deck(data) {
  return {
    id: value(data, 'id', 0),
    name: value(data, 'name'),
    description: value(data, 'description'),
    cards: value(data, 'cards', [])
  };
}

/*
Utilitary function to build a valid Card.
*/
function Card(data) {
  return {
    id: value(data, 'id'),
    front: value(data, 'front'),
    back: value(data, 'back'),
    deck: value(data, 'deck', 0)
  };
}

function value(object, property, defaultValue = null) {
  return object && object.hasOwnProperty(property) ? object[property] : defaultValue;
}

export default Data;
