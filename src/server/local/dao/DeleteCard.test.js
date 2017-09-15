import DeleteCard from './DeleteCard';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('DeleteCard', function() {

  it('should delete card with success', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 1 }));
    expect(storage.data.cards).toHaveLength(1);
    const deleted = new DeleteCard(storage).execute(storage.data.decks[0].cards[0]);
    expect(deleted).toBeDefined();
    expect(storage.data.cards).toHaveLength(0);
  });

  it('should remove deleted card reference from its parent deck', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 2 }));
    expect(storage.data.decks[0].cards).toHaveLength(2);
    new DeleteCard(storage).execute(storage.data.decks[0].cards[0]);
    expect(storage.data.decks[0].cards).toHaveLength(1);
  });

  it('should thrown an error when trying to delete non added card', () => {
    const storage = new MockStorage(MockData());
    expect(() => new DeleteCard(storage).execute(1)).toThrow();
  });

});
