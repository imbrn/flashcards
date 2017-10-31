import Dispatcher from '../Dispatcher';
import ActionsTypes from './ActionsTypes';
import DecksServices from '../../services/DecksServices';

class Actions {

  watch(deckId) {
    this._watching = new DecksServices().watchDeck(deckId, this);
  }

  onChangeDeck(deck) {
    Dispatcher.dispatch({
      type: ActionsTypes.CHANGE_DECK,
      deck
    });
  }

  onAddCard(card, deckId) {
    Dispatcher.dispatch({
      type: ActionsTypes.ADD_CARD,
      card,
      deckId
    });
  }

  onDeleteCard(card, deckId) {
    Dispatcher.dispatch({
      type: ActionsTypes.DELETE_CARD,
      card,
      deckId
    });
  }

  onChangeCard(card, deckId) {
    Dispatcher.dispatch({
      type: ActionsTypes.CHANGE_CARD,
      card,
      deckId
    });
  }

  stopWatching() {
    if (this._watching)
      this._watching.stop();
  }

}

export default new Actions();
