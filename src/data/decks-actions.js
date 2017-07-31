import DecksDispatcher from "./decks-dispatcher";
import Types from './decks-actions-types';

const Actions = {
  addDeck(name, description) {
    DecksDispatcher.dispatch({
      type: Types.ADD_DECK,
      name,
      description
    });
  }
}

export default Actions;
