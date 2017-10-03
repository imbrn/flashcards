import { auth, database } from 'firebase';
import Listeners from '../utils/Listeners';

/**
 * Reference to decks in database.
 */
class Decks {

  constructor() {
    this._onDeckAddedListeners = new Listeners();
    this._onDeckRemovedListeners = new Listeners();
    this._onDeckChangedListeners = new Listeners();
  }

  initialize() {
    auth().onAuthStateChanged(user => this._authStateChanged(user));
  }

  _authStateChanged(user) {
    if (user) {
      this._signedIn(user);
    } else {
      this._signedOut();
    }
  }

  _signedIn(user) {
    const dataRef = this._dataRef();
    dataRef.on('child_added', snapshot => this._deckAdded(snapshot));
    dataRef.on('child_removed', snapshot => this._deckRemoved(snapshot));
    dataRef.on('child_changed', snapshot => this._deckChanged(snapshot));
  }

  _deckAdded(snapshot) {
    this._onDeckAddedListeners.fire(snapshot.key, snapshot.val());
  }

  _deckRemoved(snapshot) {
    this._onDeckRemovedListeners.fire(snapshot.key, snapshot.val());
  }

  _deckChanged(snapshot) {
    this._onDeckChangedListeners.fire(snapshot.key, snapshot.val());
  }

  create(data) {
    const deck = this._dataRef().push();
    deck.set(data);
    return deck;
  }

  onDeckAdded(listener) {
    return this._onDeckAddedListeners.on(listener);
  }

  onDeckRemoved(listener) {
    return this._onDeckRemovedListeners.on(listener);
  }

  onDeckChanged(listener) {
    return this._onDeckChangedListeners.on(listener);
  }

  _dataRef() {
    return database().ref(`/decks/${auth().currentUser.uid}`);
  }

}

export default new Decks();
