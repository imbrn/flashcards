import { auth, firestore } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';

class CardsListener {

  constructor() {
    this.removeCardsSnapshotsListeners = {};
  }

  start() {
    this.removeAuthListener = auth().onAuthStateChanged(this.authStateChanged.bind(this));
  }

  authStateChanged(user) {
    if (user) {
      this.signedIn(user);
    } else {
      this.signedOut();
    }
  }

  signedIn(user) {
    this.removeDecksSnapshotsListener = firestore().collection('users')
      .doc(user.uid)
      .collection('decks')
      .onSnapshot(this.onDecksSnapshot.bind(this));
  }

  onDecksSnapshot(snapshot) {
    snapshot.docChanges.forEach(change => {
      if (change.type === 'added') this.startListeningCards(change.doc);
      if (change.type === 'removed') this.stopListeningCards(change.doc);
    });
  }

  startListeningCards(doc) {
    const listener = doc.ref.collection('cards').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this.onCardAdded(doc, change.doc);
        if (change.type === 'modified') this.onCardModified(doc, change.doc);
        if (change.type === 'removed') this.onCardRemoved(doc, change.doc);
      });
    });
    this.removeCardsSnapshotsListeners[doc.id] = listener;
  }

  onCardAdded(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_ADDED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data()
    });
  }

  onCardModified(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_CHANGED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data()
    });
  }

  onCardRemoved(deckDoc, cardDoc) {
    Dispatcher.dispatch({
      type: Types.ON_CARD_REMOVED,
      deckId: deckDoc.id,
      id: cardDoc.id,
      data: cardDoc.data()
    });
  }

  stopListeningCards(doc) {
    this.removeCardsSnapshotsListeners[doc.id]();   
    delete this.removeCardsSnapshotsListeners[doc.id];
  }

  signedOut() {
    this.removeDecksSnapshotsListener();
  }

  removeAllCardsSnapshotsListeners() {
    this.removeDecksSnapshotsListener.forEach(fn => fn());
    this.removeDecksSnapshotsListener = {};
  }

  stop() {
    this.removeAllCardsSnapshotsListeners();
    this.removeAuthListener();
  }

}

export default CardsListener;
