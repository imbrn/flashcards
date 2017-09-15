import FetchDeckByCriteria from './FetchDeckByCriteria';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchDeckByCriteria', function() {

  it('should fetch the first found deck', () => {
    const storage = new MockStorage(MockData({
      decksCount: 8,
      deckNamePattern: 'Deck ${id}'
    }));
    const found = new FetchDeckByCriteria(storage).execute(it => it.id % 2 === 0);
    expect(found).toEqual(storage.data.decks[1]);
  });

  it('when no deck applies to criteria returns undefined', () => {
    const storage = new MockStorage(MockData());
    expect(new FetchDeckByCriteria(storage).execute(it => it.id === 400)).toBeUndefined();
  });

});
