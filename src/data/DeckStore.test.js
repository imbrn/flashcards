import DeckStore from './DeckStore';
import { DecksActionsTypes } from './DecksActions';
import Dispatcher from './Dispatcher';
import DeckModel from './DeckModel';

describe('DeckModelStore', function() {

  it('fetching deck by id', () => {
    const deck = new DeckModel({ id: 1, name: 'One' });
    Dispatcher.dispatch({
      type: DecksActionsTypes.FETCH_DECK,
      deck
    });
    expect(DeckStore.getState()).toEqual(deck);
  });

});
