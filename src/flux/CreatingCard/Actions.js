import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';

class Actions {

  start(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.START,
      deck
    });
  }

  update(card) {
    Dispatcher.dispatch({
      type: ActionsTypes.UPDATE,
      card
    });
  }

  finish() {
    Dispatcher.dispatch({
      type: ActionsTypes.FINISH
    });
  }

  cancel() {
    Dispatcher.dispatch({
      type: ActionsTypes.CANCEL
    });
  }

}

export default new Actions();
