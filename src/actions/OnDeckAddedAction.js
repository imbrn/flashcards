import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Action called when a new deck is added to services database.
 */
class OnDeckAddedAction {
  constructor(id, deck) {
    this.id = id;
    this.deck = deck;
  }

  execute() {
    Dispatcher.dispatch({
      type: OnDeckAddedAction.type,
      id: this.id,
      deck: this.deck
    });
  }

  static get type() {
    return 'ON_DECK_ADDED';
  }
}

export default OnDeckAddedAction;
