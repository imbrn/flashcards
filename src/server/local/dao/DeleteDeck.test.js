import CreateDeck from './CreateDeck';
import DeleteDeck from './DeleteDeck';
import FetchDeckById from './FetchDeckById';

describe('DeleteDeck', function() {

  it('deleting with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    expect(new FetchDeckById(deck.id).execute()).toEqual(deck);
    new DeleteDeck(deck.id).execute();
    expect(new FetchDeckById(deck.id).execute()).toBeUndefined();
  });

  it('deleting non added deck should fail', () => {
    expect(() => new DeleteDeck(1).execute()).toThrow();
  });

});
