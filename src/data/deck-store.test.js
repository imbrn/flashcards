import DeckStore from './deck-store';
import { DecksActionsTypes } from './decks-actions';
import Dispatcher from './dispatcher';
import Deck from './deck';

describe('DeckStore', function() {

  it('fetching deck by id', () => {
    const deck = new Deck({ id: 1, name: 'One' });
    Dispatcher.dispatch({
      type: DecksActionsTypes.FETCH_DECK,
      deck
    });
    expect(DeckStore.getState()).toEqual(deck);
  });

});
