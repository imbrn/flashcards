import AddCard from './AddCard';
import { CreateDeck } from '../dao';
import Storage from '../storage';

describe('Add card success', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should resolves to the added card', async () => {
    const deck = new CreateDeck(Storage).execute({ name: 'One' });
    const card = await AddCard({ front: 'A', back: 'B', deck: deck.id });
    expect(card).toMatchObject({
      front: 'A',
      back: 'B',
      deck: deck.id
    });
  });

});

describe('Text auto trimming', function() {

  let deck;

  beforeEach(async () => {
    Storage.reset();
    deck = new CreateDeck(Storage).execute({ name: 'One' });
  });

  it('should trim front', async () => {
    const card = await AddCard({ front: '  A  ', back: 'B', deck: deck.id });
    expect(card).toMatchObject({ front: 'A' });
  });

  it('should trim back', async () => {
    const card = await AddCard({ front: 'A', back: '  B  ', deck: deck.id });
    expect(card).toMatchObject({ back: 'B' });
  });

});

describe('Front is not optional', function() {

  let deck;

  beforeEach(async () => {
    Storage.reset();
    deck = new CreateDeck(Storage).execute({ name: 'One' });
  });

  it('should rejects when front is not defined', () => {
    expect(AddCard({ deck: deck.id, back: 'B' })).rejects.toBeDefined();
  });

  it('should rejects when front is null', () => {
    expect(AddCard({ deck: deck.id, front: null, back: 'B' })).rejects.toBeDefined();
  });

  it('should rejects when front is undefined', () => {
    expect(AddCard({ deck: deck.id, front: undefined, back: 'B' })).rejects.toBeDefined();
  });

  it('should rejects when front is empty', () => {
    expect(AddCard({ deck: deck.id, front: '', back: 'B' })).rejects.toBeDefined();
  });

  it('should rejects when front contains only spaces', () => {
    expect(AddCard({ deck: deck.id, front: '  ', back: 'B' })).rejects.toBeDefined();
  });

});

describe('Back is not optional', function() {
  
  let deck;

  beforeEach(async () => {
    Storage.reset();
    deck = new CreateDeck(Storage).execute({ name: 'One' });
  });

  it('should rejects when back is not defined', () => {
    expect(AddCard({ deck: deck.id, front: 'A' })).rejects.toBeDefined();
  });

  it('should rejects when back is null', () => {
    expect(AddCard({ deck: deck.id, front: 'A', back: null })).rejects.toBeDefined();
  });

  it('should rejects when back is undefined', () => {
    expect(AddCard({ deck: deck.id, front: 'A', back: undefined })).rejects.toBeDefined();
  });

  it('should rejects when back is empty', () => {
    expect(AddCard({ deck: deck.id, front: 'A', back: '' })).rejects.toBeDefined();
  });

  it('should rejects when back contains only spaces', () => {
    expect(AddCard({ deck: deck.id, front: 'A', back: ' ' })).rejects.toBeDefined();
  });

});
