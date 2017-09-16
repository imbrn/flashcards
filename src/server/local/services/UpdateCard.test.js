import UpdateCard from './UpdateCard';
import Storage from '../storage';
import { CreateDeck, CreateCard, FetchCardById } from '../dao';

describe('Update success', function() {

  let card;

  beforeEach(() => {
    Storage.reset();
    const deck = new CreateDeck(Storage).execute({ name: 'One' });
    card = new CreateCard(Storage).execute({ deck: deck.id, front: 'A', back: 'B' });
  });

  it('should updates Storage', async () => {
    expect(new FetchCardById(Storage).execute(card.id)).toEqual(card);
    const updated = await UpdateCard({ id: card.id, front: 'New a', back: 'New b' });
    const after = new FetchCardById(Storage).execute(card.id);
    expect(after).toEqual(updated);
    expect(after).not.toEqual(card);
  });

  it('should resolve to the updated card', async () => {
    const updated = await UpdateCard({ id: card.id, front: 'New a', back: 'New b' });
    expect(updated).toMatchObject({ front: 'New a', back: 'New b' });
  });

  it('should have no effect when updating deck owner reference', async () => {
    const updated = await UpdateCard({ id: card.id, deck: 500 });
    expect(updated).toEqual(card);
  });

});

describe('Text auto trimming', function() {

  let card;
  
  beforeEach(() => {
    Storage.reset();
    const deck = new CreateDeck(Storage).execute({ name: 'One' });
    card = new CreateCard(Storage).execute({ deck: deck.id, front: 'A', back: 'B' });
  });

  it('should trim front', async () => {
    const updated = await UpdateCard({ id: card.id, front: '   New A   '});
    expect(updated).toMatchObject({ front: 'New A', back: 'B' });
  });

  it('should trim back', async () => {
    const updated = await UpdateCard({ id: card.id, back: '   New B   '});
    expect(updated).toMatchObject({ front: 'A', back: 'New B' });
  });

});

describe('Front is not optional', function() {

  let card;

  beforeEach(() => {
    Storage.reset();
    const deck = new CreateDeck(Storage).execute({ name: 'One' });
    card = new CreateCard(Storage).execute({ deck: deck.id, front: 'A', back: 'B' });
  });

  it('should rejects when front is null', () => {
    expect(UpdateCard({ id: card.id, front: null })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when front is undefined', () => {
    expect(UpdateCard({ id: card.id, front: undefined })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when front is empty', () => {
    expect(UpdateCard({ id: card.id, front: '' })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when front contains only spaces', () => {
    expect(UpdateCard({ id: card.id, front: '  ' })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

});

describe('Back is not optional', function() {

  let card;
  
  beforeEach(() => {
    Storage.reset();
    const deck = new CreateDeck(Storage).execute({ name: 'One' });
    card = new CreateCard(Storage).execute({ deck: deck.id, front: 'A', back: 'B' });
  });

  it('should rejects when back is null', () => {
    expect(UpdateCard({ id: card.id, back: null })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when back is undefined', () => {
    expect(UpdateCard({ id: card.id, back: undefined })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when back is empty', () => {
    expect(UpdateCard({ id: card.id, back: '' })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

  it('should rejects when back contains only spaces', () => {
    expect(UpdateCard({ id: card.id, back: '  ' })).rejects.toBeDefined();
    expect(card.front).toBe('A');
  });

});
