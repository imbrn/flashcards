import FetchCardsByCriteria from './FetchCardsByCriteria';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchCardsByCriteria', function() {

  it('should fetch cards with success', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 3 }));
    const found = new FetchCardsByCriteria(storage).execute(it => it.id % 2 !== 0);
    expect(found).toEqual([storage.data.cards[0], storage.data.cards[2]]);
  });

  it('should return an empty array when no cards are matched by the criteria', () => {
    const storage = new MockStorage(MockData());
    expect(new FetchCardsByCriteria(storage).execute(it => it.front === 'A')).toEqual([]);
  });

});
