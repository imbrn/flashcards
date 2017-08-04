import Actions from './creating-deck-actions';
import Store from './creating-deck-store';
import Deck from './deck-record';

describe('CreatingDeckStore', function() {
 
  beforeEach(() => {
    Actions.stopDeckCreation();
  });
  
  it('start creating deck', () => {
    Actions.startCreatingDeck();
    expect(Store.getState()).toBeTruthy();
  });

  it('stop deck creation', () => {
    const deck = new Deck({name: 'One'});
    Actions.stopDeckCreation(deck);
    expect(Store.getState()).toBeFalsy();
  });

});
