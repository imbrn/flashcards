import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';
import CreatingDeckStore from '../stores/CreatingDeckStore';
import { auth, firestore } from 'firebase';

class CreatingDeckActions {

  start() {
    Dispatcher.dispatch({
      type: Types.CREATING_DECK_START
    });
  }

  updateDeck(deck) {
    Dispatcher.dispatch({
      type: Types.CREATING_DECK_UPDATE_DECK,
      deck
    });
  }

  finish() {
    this.persistDeck();
    Dispatcher.dispatch({
      type: Types.CREATING_DECK_FINISH
    });
  }

  persistDeck() {
    const deck = CreatingDeckStore.getState();
    const decksRef = firestore().collection(`users/${auth().currentUser.uid}/decks`);
    const ret = decksRef.add({
      name: deck.name,
      description: deck.description,
      createTime: firestore.FieldValue.serverTimestamp(),
      updateTime: firestore.FieldValue.serverTimestamp()
    });
  }

}

export default new CreatingDeckActions();
