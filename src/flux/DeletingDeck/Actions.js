import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import DeletingDeckStore from './Store';
import DecksServices from '../../services/DecksServices';

class Actions {

  delete(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.DELETE,
      deck
    });
  }

  confirm() {
    const deck = DeletingDeckStore.getState().get('deck');
    new DecksServices().deleteDeck(deck);
    Dispatcher.dispatch({
      type: ActionsTypes.CONFIRM,
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
