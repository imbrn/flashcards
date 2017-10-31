import Dispatcher from '../Dispatcher';
import Types from './ActionsTypes';
import DecksServices from '../../services/DecksServices';
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
    new DecksServices().createDeck(deck);
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
