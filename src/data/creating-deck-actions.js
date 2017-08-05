import AppDispatcher from './dispatcher';
import Types from './creating-deck-actions-types';

/**
 * Actions used to create decks.
 */
class CreatingDecksActions {
  startCreatingDeck() {
    AppDispatcher.dispatch({
      type: Types.START_CREATING_DECK
    });
  }
  stopDeckCreation() {
    AppDispatcher.dispatch({
      type: Types.STOP_DECK_CREATION
    });
  }
}

export default new CreatingDecksActions();
