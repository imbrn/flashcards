import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import FetchCardById from './FetchCardById';
import Storage from '../storage';

describe('FetchCardById', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should fetch card with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const card = new CreateCard({ front: 'A', back: 'B', deck: deck.id }).execute();
    expect(new FetchCardById(card.id).execute()).toEqual(card);
  });

  it('should return undefined when no card is found', () => {
    expect(new FetchCardById(2).execute()).toBeUndefined();
  });

});
