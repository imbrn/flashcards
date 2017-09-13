import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import DeleteCard from './DeleteCard';
import FetchCardById from './FetchCardById';
import FetchDeckById from './FetchDeckById';
import Storage from '../storage';

describe('DeleteCard', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should delete card with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const card = new CreateCard({ deck: deck.id, front: 'A', back: 'B' }).execute();
    expect(new FetchCardById(card.id).execute()).toEqual(card);
    const deleted = new DeleteCard(card.id).execute();
    expect(deleted).toEqual(card);
    expect(new FetchCardById(card.id).execute()).toBeUndefined();
  });

  it('should remove deleted card reference from its parent deck', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const card = new CreateCard({ deck: deck.id, front: 'A', back: 'B' }).execute();
    expect(new FetchDeckById(deck.id).execute()).toMatchObject({ cards: [card.id] });
    new DeleteCard(card.id).execute();
    expect(new FetchDeckById(deck.id).execute()).toMatchObject({ cards: [] });
  });

  it('should thrown an error when trying to delete non added card', () => {
    expect(() => new DeleteCard(1).execute()).toThrow();
  });

});
