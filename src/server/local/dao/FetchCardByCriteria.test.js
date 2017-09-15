import FetchCardByCriteria from './FetchCardByCriteria';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchCardByCriteria', function() {

  it('should return the first found card', () => {
    const storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 3,
      cardFrontPattern: 'The card ${id}',
      cardBackPattern: 'Back of the card ${id}'
    }));

    const one = new FetchCardByCriteria(storage).execute(it => it.front.startsWith('The card'));
    expect(one).toBeDefined();
    expect(one).toEqual(storage.data.cards[0]);
  });

  it('should return undefined when no card matches the criteria', () => {
    const storage = new MockStorage(MockData());
    expect(new FetchCardByCriteria(storage).execute(it => it.front === 'A')).toBeUndefined();
  });

});
