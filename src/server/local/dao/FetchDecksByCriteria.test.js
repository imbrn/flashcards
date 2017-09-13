import CreateDeck from './CreateDeck';
import FetchDecksByCriteria from './FetchDecksByCriteria';
import Storage from '../storage';

describe('FetchDecksByCriteria', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('fetching decks with success', () => {
    const one = new CreateDeck({ name: 'One', description: 'Deck one' }).execute();
    const two = new CreateDeck({ name: 'Two', description: 'Deck two' }).execute();
    const decks = new FetchDecksByCriteria(it => it.description.startsWith('D')).execute();
    expect(decks).toEqual([one, two]);
  });

  it('should return empty array when no decks are applied by criteria', () => {
    const decks = new FetchDecksByCriteria(it => it.name === 'Hello').execute();
    expect(decks).toHaveLength(0);
  });

});
