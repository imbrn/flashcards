import FetchCardsByCriteria from './FetchCardsByCriteria';
import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import Storage from '../storage';

describe('FetchCardsByCriteria', function() {

  beforeEach(() => {
    Storage.reset();
  });
  
  it('should fetch cards with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const one = new CreateCard({ front: 'A', back: 'Bb', deck: deck.id }).execute();
    const two = new CreateCard({ front: 'C', back: 'Bb', deck: deck.id }).execute();
    expect(new FetchCardsByCriteria(it => it.back.startsWith('B')).execute()).toEqual([one, two]);
    expect(new FetchCardsByCriteria(it => it.front === 'A').execute()).toEqual([one]);
  });

  it('should return an empty array when no cards are matched by the criteria', () => {
    expect(new FetchCardsByCriteria(it => it.front === 'A').execute()).toEqual([]);
  });

});
