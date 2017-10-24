import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import EditingDeckStore from './Store';
import Decks from '../../model/Decks';
import updateDeck from '../../model/Decks/updateDeck';

class Actions {

  start(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.START,
      deck
    });
  }

  update(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.UPDATE,
      deck
    });
  }

  finish() {
    const deck = EditingDeckStore.getState().get('deck');
    Decks().operation(updateDeck).withParams(deck).done().execute();
    Dispatcher.dispatch({
      type: ActionsTypes.FINISH,
      deck
    });
  }

  cancel() {
    Dispatcher.dispatch({
      type: ActionsTypes.CANCEL
    });
  }

}

export default new Actions();
