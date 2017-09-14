import FetchDeckCards from './FetchDeckCards';
import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import Storage from '../storage';

describe('FetchDeckCards', function() {
  
  beforeEach(() => {
    Storage.reset();
  });

  it('should return cards with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const one = new CreateCard({ front: 'A', back: 'B', deck: deck.id }).execute();
    const two = new CreateCard({ front: 'C', back: 'D', deck: deck.id }).execute();
    expect(new FetchDeckCards(deck.id).execute()).toEqual([one, two]);
  });

  it('should return an empty array whent the specified deck have no cards', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    expect(new FetchDeckCards(deck.id).execute()).toEqual([]);
  });

  it('should throw an error when the specified deck not exist', () => {
    expect(() => new FetchDeckCards(1).execute()).toThrow();
  });

});
