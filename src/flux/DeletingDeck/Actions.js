import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import DeletingDeckStore from './Store';
import Decks from '../../model/Decks';
import deleteDeck from '../../model/Decks/deleteDeck';

class Actions {

  delete(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.DELETE,
      deck
    });
  }

  confirm() {
    const deck = DeletingDeckStore.getState().get('deck');
    Decks().operation(deleteDeck).withParams(deck).done().execute();
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
