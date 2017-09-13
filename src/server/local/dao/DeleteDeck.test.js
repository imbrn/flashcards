import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import DeleteDeck from './DeleteDeck';
import FetchDeckById from './FetchDeckById';
import FetchCardById from './FetchCardById';
import Storage from '../storage';

describe('DeleteDeck', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('deleting with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    expect(new FetchDeckById(deck.id).execute()).toEqual(deck);
    new DeleteDeck(deck.id).execute();
    expect(new FetchDeckById(deck.id).execute()).toBeUndefined();
  });

  it('deleting non added deck should fail', () => {
    expect(() => new DeleteDeck(1).execute()).toThrow();
  });

  it('should delete cards which belong to deleted deck', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const card = new CreateCard({ front: 'A', back: 'B', deck: deck.id }).execute();
    expect(new FetchCardById(card.id).execute()).toEqual(card);
    new DeleteDeck(deck.id).execute();
    expect(new FetchCardById(card.id).execute()).toBeUndefined();
  });

});
