import Dispatcher from '../Dispatcher';
import Types from './ActionsTypes';
import Decks from '../../model/Decks';
import createDeck from '../../model/Decks/createDeck';
import CreatingDeckStore from './Store';

class Actions {

  start() {
    Dispatcher.dispatch({
      type: Types.START
    });
  }

  update(deck) {
    Dispatcher.dispatch({
      type: Types.UPDATE,
      deck
    });
  }

  finish() {
    const deck = CreatingDeckStore.getState().get('deck');
    Decks().operation(createDeck).withParams(deck).done().execute();
    Dispatcher.dispatch({
      type: Types.FINISH,
      deck
    });
  }

  cancel() {
    Dispatcher.dispatch({
      type: Types.CANCEL
    });
  }

}

export default new Actions();
