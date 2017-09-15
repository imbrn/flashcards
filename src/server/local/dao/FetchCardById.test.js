import FetchCardById from './FetchCardById';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchCardById', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 2 }));
  });

  it('should fetch card with success', () => {
    const card = new FetchCardById(this.storage).execute(1);
    expect(card).toEqual(this.storage.data.cards[0]);
  });

  it('should return undefined when no card is found', () => {
    const card = new FetchCardById(this.storage).execute(4);
    expect(card).toBeUndefined();
  });

});
