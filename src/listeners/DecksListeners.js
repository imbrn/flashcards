import Decks from '../services/decks/Decks';
import OnDeckAddedAction from '../actions/OnDeckAddedAction';
import OnDeckRemovedAction from '../actions/OnDeckRemovedAction';
import OnDeckChangedAction from '../actions/OnDeckChangedAction';

/**
 * Listen to decks services and call actions.
 */
class DecksListeners {

  initialize() {
    Decks.onDeckAdded(this.onDeckAdded);
    Decks.onDeckRemoved(this.onDeckRemoved);
    Decks.onDeckChanged(this.onDeckChanged);
  }

  onDeckAdded(id, deck) {
    new OnDeckAddedAction(id, deck).execute();
  }

  onDeckRemoved(id, deck) {
    new OnDeckRemovedAction(id, deck).execute();
  }

  onDeckChanged(id, deck) {
    new OnDeckChangedAction(id, deck).execute();
  }

}

export default new DecksListeners();
