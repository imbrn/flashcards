import AppDispatcher from './dispatcher';
import Types from './decks-actions-types';
import { BasicDecksService, BrowserPersistence } from './service/basic-decks-service';

/**
 * Flux actions which works with local services.
 */
class BasicDecksActions {

  constructor(persistence) {
    this._service = new BasicDecksService(persistence);
  }

  loadDecks() {
    const decks = this._service.fetchAllDecks();
    AppDispatcher.dispatch({
      type: Types.ON_DECKS_LOADED,
      decks
    });
  }

  addDeck(deck) {
    try {
      this._addValidDeck(deck);
    } catch (error) {
      this._onAddInvalidDeck(deck, error);
    }
  }

  _addValidDeck(deck) {
    deck = this._service.saveDeck(deck);
    AppDispatcher.dispatch({
      type: Types.ADD_DECK,
      deck
    });
  }

  _onAddInvalidDeck(deck, error) {
    AppDispatcher.dispatch({
      type: Types.ON_ADD_DECK_FAILED,
      deck,
      error
    });
  }

  updateDeck(deck) {
    try {
      this._updateValidDeck(deck);
    } catch (error) {
      this._onUpdateInvalidDeck(deck, error);
    }
  }

  _updateValidDeck(deck) {
    deck = this._service.saveDeck(deck);
    AppDispatcher.dispatch({
      type: Types.EDIT_DECK,
      deck
    });
  }

  _onUpdateInvalidDeck(deck, error) {
    AppDispatcher.dispatch({
      type: Types.ON_EDIT_DECK_FAILED,
      deck,
      error
    });
  }

  deleteDeck(deckId) {
    try {
      this._deleteAddedDeck(deckId);
    } catch (error) {
      this._onDeleteNonAddedDeck(deckId);
    }
  }

  _deleteAddedDeck(deckId) {
    this._service.deleteDeck(deckId);
    AppDispatcher.dispatch({
      type: Types.DELETE_DECK,
      deckId
    });
  }

  _onDeleteNonAddedDeck(deckId) {
    AppDispatcher.dispatch({
      type: Types.ON_DELETE_NON_ADDED_DECK,
      deckId
    });
  }

  resetDecks() {
    AppDispatcher.dispatch({
      type: Types.RESET_DECK
    });
  }

}

export default new BasicDecksActions(new BrowserPersistence());
export {
  BasicDecksActions
};
