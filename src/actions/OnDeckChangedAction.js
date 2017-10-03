import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Action called when a deck changed in the services database.
 */
class OnDeckChangedAction {
  constructor(id, deck) {
    this.id = id;
    this.deck = deck;
  }

  execute() {
    Dispatcher.dispatch({
      type: OnDeckChangedAction.type,
      id: this.id,
      deck: this.deck
    });
  }

  static get type() {
    return 'ON_DECK_CHANGED';
  }
}

export default OnDeckChangedAction;
