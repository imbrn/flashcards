import FetchAllDecks from './FetchAllDecks';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('Fetch success', function() {

  let storage;

  beforeAll(() => {
    storage = new MockStorage(MockData({
      decksCount: 5,
      cardsPerDeck: 2,
      deckNamePattern: 'Deck ${id}',
      deckDescriptionPattern: 'Description ${id}'
    }));
  });

  it('should fetch all decks', () => {
    const decks = new FetchAllDecks(storage).execute();
    expect(decks).toEqual(storage.data.decks);
  });

});
