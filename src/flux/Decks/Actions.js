import Dispatcher from '../Dispatcher';
import DecksServices from '../../services/DecksServices';
import DecksActionsTypes from './ActionsTypes';
import CardsActionsTypes from '../Cards/ActionsTypes';

class Actions {

  watchAllDecks() {
    this._watching = new DecksServices().watchAllDecks(this);
  }

  stopWatchingAllDecks() {
    this._watching.stop();
  }

  onAddDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.ADD,
      deck
    });
  }

  onDeleteDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.DELETE,
      deck
    });
  }

  onChangeDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.CHANGE,
      deck
    });
  }

  onAddCard(card, deckId) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.ADD,
      deckId,
      card
    });
  }

  onChangeCard(card, deckId) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.CHANGE,
      deckId,
      card
    });
  }

  onDeleteChard(deckId, card) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.DELETE,
      deckId,
      card
    });
  }

}

export default new Actions();
