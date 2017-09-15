import DeleteDeck from './DeleteDeck';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('DeleteDeck', function() {

  it('should delete deck with success', () => {
    const storage = new MockStorage(MockData({ decksCount: 2 }));
    expect(storage.data.decks).toHaveLength(2);
    const deleted = new DeleteDeck(storage).execute(storage.data.decks[0].id);
    expect(deleted).toBeDefined();
    expect(deleted).not.toEqual(storage.data.decks[0]);
  });

  it('should throw an error when trying to delete non added deck', () => {
    const storage = new MockStorage(MockData());
    expect(() => new DeleteDeck(storage).execute(1)).toThrow();
  });

  it('should delete cards which belong to the deleted deck', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 3 }));
    expect(storage.data.cards).toHaveLength(3);
    new DeleteDeck(storage).execute(storage.data.decks[0].id);
    expect(storage.data.cards).toHaveLength(0);
  });

});
