import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Action called when a deck is removed from services database.
 */
class OnDeckRemovedAction {
  constructor(id, deck) {
    this.id = id;
    this.deck = deck;
  }

  execute() {
    Dispatcher.dispatch({
      type: OnDeckRemovedAction.type,
      id: this.id,
      deck: this.deck
    });
  }

  static get type() {
    return 'ON_DECK_REMOVED';
  }
}

export default OnDeckRemovedAction;

