import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import FetchCardByCriteria from './FetchCardByCriteria';
import Storage from '../storage';

describe('FetchCardByCriteria', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should return the first found card', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const cardOne = new CreateCard({ front: 'A', back: 'B', deck: deck.id }).execute();
    const cardTwo = new CreateCard({ front: 'A', back: 'C', deck: deck.id }).execute();
    expect(new FetchCardByCriteria(it => it.front.startsWith('A')).execute()).toEqual(cardOne);
    expect(new FetchCardByCriteria(it => it.back === 'C').execute()).toEqual(cardTwo);
  });

  it('should return undefined when no card matches the criteria', () => {
    expect(new FetchCardByCriteria(it => it.front === 'A').execute()).toBeUndefined();
  });

});
