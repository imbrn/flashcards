import { auth, firestore } from 'firebase';
import DecksWatching from './DecksWatching';
import DeckWatching from './DeckWatching';

class DecksServices {

  constructor(uid) {
    this._decksCollection = firestore()
      .collection('users').doc(uid ? uid : auth().currentUser.uid)
      .collection('decks');
  }

  watchAllDecks(listener) {
    const watching = new DecksWatching(this._decksCollection, listener);
    watching.watch();
    return watching;
  }

  watchDeck(deckId, listener) {
    const watching = new DeckWatching(this._decksCollection.doc(deckId), listener);
    watching.watch();
    return watching;
  }

  createDeck(deck) {
    const objDeck = {
      name: deck.name,
      description: deck.description,
      createTime: firestore.FieldValue.serverTimestamp(),
      updateTime: firestore.FieldValue.serverTimestamp()
    };
    return this._decksCollection.add(objDeck);
  }

  changeDeck(deck) {
    const objDeck = {
      name: deck.name,
      description: deck.description,
      updateTime: firestore.FieldValue.serverTimestamp()
    };
    return this._decksCollection.doc(deck.id).update(objDeck);
  }

  deleteDeck(deck) {
    // TODO: remove cards too
    return this._decksCollection.doc(deck.id).delete();
  }

}

export default DecksServices;
