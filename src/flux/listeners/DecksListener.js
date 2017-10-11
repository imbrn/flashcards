import { auth, firestore } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';

class DecksListener {

  constructor() {
    this.removeCardsSnapshotsListeners = {};
  }

  start() {
    this.removeAuthListener = auth().onAuthStateChanged(this.authStateChanged.bind(this));
  }

  authStateChanged(user) {
    if (user) {
      this.onSignIn(user);
    } else {
      this.onSignOut();
    }
  }

  onSignIn(user) {
    this.removeDecksListener = firestore().collection('users')
      .doc(user.uid)
      .collection('decks')
      .orderBy('createTime')
      .onSnapshot(this.onDecksSnapshot.bind(this));
  }

  onDecksSnapshot(snapshot) {
    snapshot.docChanges.forEach(this.deckDocChange.bind(this));
  }

  deckDocChange(change) {
    if (change.type === 'added') this.deckAdded(change.doc);
    if (change.type === 'modified') this.deckModified(change.doc);
    if (change.type === 'removed') this.deckRemoved(change.doc);
  }

  deckAdded(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_ADDED,
      id: doc.id,
      data: doc.data()
    });
    this.startListeningCards(doc);
  }

  startListeningCards(doc) {
    const listener = doc.ref.collection('cards').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this.cardAdded(doc, change.doc);
        if (change.type === 'modified') this.cardModified(doc, change.doc);
        if (change.type === 'removed') this.cardRemoved(doc, change.doc);
      });
    });
    this.removeCardsSnapshotsListeners[doc.id] = listener;
  }

  cardAdded(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_ADDED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data(),
    });
  }

  cardModified(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_CHANGED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data()
    });
  }

  cardRemoved(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_REMOVED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data()
    });
  }

  deckModified(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_CHANGED,
      id: doc.id,
      data: doc.data()
    });
  }

  deckRemoved(doc) {
    this.stopListeningCards(doc);
    Dispatcher.dispatch({
      type: Types.ON_DECK_REMOVED,
      id: doc.id,
      data: doc.data()
    });
  }

  stopListeningCards(doc) {
    this.removeCardsSnapshotsListeners[doc.id]();
    delete this.removeCardsSnapshotsListeners[doc.id];
  }

  onSignOut() {
    this.removeAllCardsSnapshotsListeners();
    this.removeDecksListener();
  }

  removeAllCardsSnapshotsListeners() {
    for (const key in this.removeCardsSnapshotsListeners) {
      this.removeCardsSnapshotsListeners[key]();
    }
    this.removeCardsSnapshotsListeners = {};
  }

  stop() {
    this.removeAllCardsSnapshotsListeners();
    this.removeDecksListener();
    this.removeAuthListener();
  }

}

export default DecksListener; 
