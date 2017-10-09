import { auth, firestore } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';

class DecksListener {

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
  }

  deckModified(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_CHANGED,
      id: doc.id,
      data: doc.data()
    });
  }

  deckRemoved(doc) {
    Dispatcher.dispatch({
      type: Types.ON_DECK_REMOVED,
      id: doc.id,
      data: doc.data()
    });
  }

  onSignOut() {
    this.removeDecksListener();
  }

  stop() {
    this.removeDecksListener();
    this.removeAuthListener();
  }

}

export default DecksListener; 
