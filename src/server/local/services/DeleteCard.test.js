import DeleteCard from './DeleteCard';
import { CreateDeck, CreateCard, FetchCardById, FetchDeckById } from '../dao';
import Storage from '../storage';

describe('Delete card success', function() {

  let card;

  beforeEach(async () => {
    Storage.reset();
    const deck = await new CreateDeck(Storage).execute({ name: 'One' });
    card = await new CreateCard(Storage).execute({
      deck: deck.id, front: 'A', back: 'B'
    });
  });

  it('should resolves to the deleted card', async () => {
    const deleted = await DeleteCard(card.id);
    expect(deleted).toEqual(card);
  });

  it('should remove card from Storage', async () => {
    expect(new FetchCardById(Storage).execute(card.id)).toBeDefined();
    await DeleteCard(card.id);
    expect(new FetchCardById(Storage).execute(card.id)).toBeUndefined();
  });

  it('should remove card reference from its owner deck', async () => {
    expect(new FetchDeckById(Storage).execute(card.deck).cards).toHaveLength(1);
    await DeleteCard(card.id);
    expect(new FetchDeckById(Storage).execute(card.deck).cards).toHaveLength(0);
  });

});

describe('Pre existence', function() {

  it('should rejects when the specified Id does not exist', () => {
    expect(DeleteCard(500)).rejects.toBeDefined();
  });

});
