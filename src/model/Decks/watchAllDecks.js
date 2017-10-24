import Deck from '../Deck';
import Card from '../Card';

const watchAllDecks = (decks, callbacks) => {
  const listener = new WatchAllDecksListener(decks, callbacks);
  listener.start();
  return () => {
    listener.stop();
  };
};

class WatchAllDecksListener {

  constructor(decks, callbacks) {
    this._decks = decks;
    this._callbacks = callbacks;
    this._cardsListeners = {};
  }

  start() {
    this._removeDecksListener = this._decks.decksRef.onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this._onDeckAdded(change.doc);
        if (change.type === 'removed') this._onDeckRemoved(change.doc);
        if (change.type === 'modified') this._onDeckChanged(change.doc);
      });
    });
  }

  _onDeckAdded(doc) {
    const deck = this._buildDeck(doc);
    this._startListenCards(doc);
    this._safetyCall(this._callbacks.onAddDeck, deck);
  }

  _startListenCards(deckDoc) {
    const listener = deckDoc.ref.collection('cards').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this._onCardAdded(deckDoc, change.doc);
        if (change.type === 'removed') this._onCardRemoved(deckDoc, change.doc);
        if (change.type === 'modified') this._onCardChanged(deckDoc, change.doc);
      });
    });
    this._cardsListeners[deckDoc.id] = listener;
  }

  _onCardAdded(deckDoc, cardDoc) {
    const card = this._buildCard(cardDoc);
    this._safetyCall(this._callbacks.onAddCard, deckDoc.id, card);
  }

  _onCardRemoved(deckDoc, cardDoc) {
    const card = this._buildCard(cardDoc);
    this._safetyCall(this._callbacks.onRemoveCard, deckDoc.id, card);
  }

  _onCardChanged(deckDoc, cardDoc) {
    const card = this._buildCard(cardDoc);
    this._safetyCall(this._callbacks.onChangeCard, deckDoc.id, card);
  }

  _onDeckRemoved(doc) {
    const deck = this._buildDeck(doc);
    this._stopListenCards(doc);
    this._safetyCall(this._callbacks.onRemoveDeck, deck);
  }

  _stopListenCards(deckDoc) {
    this._cardsListeners[deckDoc.id]();
    delete this._cardsListeners[deckDoc.id];
  }

  _onDeckChanged(doc) {
    const deck = this._buildDeck(doc);
    this._safetyCall(this._callbacks.onChangeDeck, deck);
  }

  _buildDeck(doc) {
    return Deck({
      id: doc.id,
      ...doc.data()
    });
  }

  _buildCard(cardDoc) {
    return Card({
      id: cardDoc.id,
      ...cardDoc.data()
    });
  }

  _safetyCall(func, ...params) {
    if (func)
      func(...params);
  }

  stop() {
    this._removeAllCardsListeners();
    this._removeDecksListener();
  }

  _removeAllCardsListeners() {
    for (const key in this._cardsListeners)
      this._cardsListeners[key]();
    this._cardsListeners = {};
  }

}

export default watchAllDecks;
