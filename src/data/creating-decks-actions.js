import DecksDispatcher from "./decks-dispatcher";
import Types from './decks-actions-types';

/**
 * Actions used to create decks.
 */
class CreatingDecksActions {
  start() {
    DecksDispatcher.dispatch({
      type: Types.START_CREATING_DECK
    });
  }
  stop() {
    DecksDispatcher.dispatch({
      type: Types.STOP_CREATING_DECK
    });
  }
}

export default new CreatingDecksActions();
