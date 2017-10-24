import Dispatcher from '../Dispatcher';
import Decks from '../../model/Decks';
import watchAllDecks from '../../model/Decks/watchAllDecks';
import DecksActionsTypes from './ActionsTypes';
import CardsActionsTypes from '../Cards/ActionsTypes';

class Actions {

  watchAllDecks() {
    this._stopWatchingAllDecks = Decks().operation(watchAllDecks)
      .withParams({
        onAddDeck: this._onAddDeck,
        onRemoveDeck: this._onRemoveDeck,
        onChangeDeck: this._onChangeDeck,
        onAddCard: this._onAddCard,
        onRemoveCard: this._onRemoveCard,
        onChangeCard: this._onChangeCard
      }).done()
      .execute();
  }

  stopWatchingAllDecks() {
    if (this._stopWatchingAllDecks)
      this._stopWatchingAllDecks();
  }

  _onAddDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.ADD,
      deck
    });
  }

  _onRemoveDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.REMOVE,
      deck
    });
  }

  _onChangeDeck(deck) {
    Dispatcher.dispatch({
      type: DecksActionsTypes.CHANGE,
      deck
    });
  }

  _onAddCard(deckId, card) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.ADD,
      deckId,
      card
    });
  }

  _onChangeCard(deckId, card) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.CHANGE,
      deckId,
      card
    });
  }

  _onRemoveChard(deckId, card) {
    Dispatcher.dispatch({
      type: CardsActionsTypes.REMOVE,
      deckId,
      card
    });
  }

}

export default new Actions();
