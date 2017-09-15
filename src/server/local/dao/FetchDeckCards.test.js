import FetchDeckCards from './FetchDeckCards';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('FetchDeckCards', function() {

  it('should fetch all cards from the specified deck', () => {
    const storage = new MockStorage(MockData({ decksCount: 2, cardsPerDeck: 4 }));
    const cards = new FetchDeckCards(storage).execute(storage.data.decks[1].id);
    expect(cards).toEqual(decksByIndices(storage, [4, 5, 6, 7]));
  });

  it('should return an empty array whent the specified deck have no cards', () => {
    const storage = new MockStorage(MockData({ decksCount: 1 }));
    const decks = new FetchDeckCards(storage).execute(storage.data.decks[0].id);
    expect(decks).toEqual([]);
  });

  it('should throw an error when the specified deck not exist', () => {
    const storage = new MockStorage(MockData());
    expect(() => new FetchDeckCards(storage).execute(15)).toThrow();
  });

});

function decksByIndices(storage, indices) {
  return indices.map(index => storage.data.cards[index]);
}
