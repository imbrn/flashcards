import { auth, firestore } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from './Types';

class UserDecksActions {

  constructor() {
    this.cardsListeners = {};
  }

  listen() {
    const userDecksRef = firestore().collection(`users/${auth().currentUser.uid}/decks`);
    this.stopListening = userDecksRef.onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this.onDeckAdded(change.doc);
        if (change.type === 'modified') this.onDeckModified(change.doc);
        if (change.type === 'removed') this.onDeckRemoved(change.doc);
      });
    });
  }

  onDeckAdded(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_ADDED,
      id: doc.id,
      data: doc.data(),
    });
    this.listenCards(doc);
  }

  listenCards(doc) {
    const listener = doc.ref.collection('cards').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this.onCardAdded(doc, change.doc);
        if (change.type === 'modified') this.onCardChanged(doc, change.doc);
        if (change.type === 'removed') this.onCardRemoved(doc, change.doc);
      });
    });
    this.cardsListeners[doc.id] = listener;
  }

  onCardAdded(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_ADDED,
      deckId: deckDoc.id,
      cardId: cardDoc.id,
      cardData: cardDoc.data()
    });
  }

  onCardChanged(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_CHANGED,
      deckId: deckDoc.id,
      cardId: cardDoc.id,
      cardData: cardDoc.data()
    });
  }

  onCardRemoved(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_REMOVED,
      deckId: deckDoc.id,
      cardId: cardDoc.id,
      cardData: cardDoc.data()
    });
  }

  onDeckModified(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_CHANGED,
      id: doc.id,
      data: doc.data(),
    });
  }

  onDeckRemoved(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_REMOVED,
      id: doc.id,
      data: doc.data(),
    });
    this.unlistenCards(doc);
  }

  unlistenCards(doc) {
    this.cardsListeners[doc.id]();
    delete this.cardsListeners[doc.id];
  }

  stopListeningCards() {
    for (const key in this.cardsListeners) {
      this.cardsListeners[key]();
    }
    this.cardsListeners = {};
  }

  unlisten() {
    this.stopListeningCards();
    if (this.stopListening) {
      this.stopListening();
    }
  }

}

export default new UserDecksActions();
