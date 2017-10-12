import Dispatcher from '../Dispatcher';
import Types from './Types';
import EditingDeckStore from '../stores/EditingDeckStore';
import { auth, firestore } from 'firebase';

class EditingDeckActions {

  start(deck) {
    Dispatcher.dispatch({
      type: Types.EDITING_DECK_START,
      deck
    });
  }

  updateDeck(deck) {
    Dispatcher.dispatch({
      type: Types.EDITING_DECK_UPDATE_DECK,
      deck
    });
  }

  finish() {
    this.persist();
    Dispatcher.dispatch({
      type: Types.EDITING_DECK_FINISH
    });
  }

  persist() {
    const before = EditingDeckStore.getState().get('before');
    const after = EditingDeckStore.getState().get('after');
    if (!before.equals(after)) {
      const deckRef = firestore().doc(`users/${auth().currentUser.uid}/decks/${after.id}`);
      deckRef.update({
        name: after.name,
        description: after.description,
        updateTime: firestore.FieldValue.serverTimestamp()
      });
    }
  }

  cancel() {
    Dispatcher.dispatch({
      type: Types.EDITING_DECK_CANCEL
    });
  }

}

export default new EditingDeckActions();
