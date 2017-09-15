import FetchDeckById from './FetchDeckById';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchDeckById', function() {

  it('should fetch deck with success', () => {
    const storage = new MockStorage(MockData({ decksCount: 4 }));
    const deck = new FetchDeckById(storage).execute(3);
    expect(deck).toEqual(storage.data.decks[2]);
  });

  it('returns undefined when no deck is found', () => {
    const storage = new MockStorage(MockData());
    expect(new FetchDeckById(storage).execute(1)).toBeUndefined();
  });

});
