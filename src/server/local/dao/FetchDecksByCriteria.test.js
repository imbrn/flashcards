import FetchDecksByCriteria from './FetchDecksByCriteria';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchDecksByCriteria', function() {

  it('should fetch all decks which match the criteria', () => {
    const storage = new MockStorage(MockData({ decksCount: 4 }));
    const decks = new FetchDecksByCriteria(storage).execute(it => it.id % 2 === 0);
    expect(decks).toEqual([
      storage.data.decks[1],
      storage.data.decks[3]
    ]);
  });

  it('should return empty array when no decks are applied by criteria', () => {
    const storage = new MockStorage(MockData({ decksCount: 10 }));
    const decks = new FetchDecksByCriteria(storage).execute(it => it.id > 30);
    expect(decks).toHaveLength(0);
  });

});
