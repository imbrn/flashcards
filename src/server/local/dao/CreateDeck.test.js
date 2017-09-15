import CreateDeck from './CreateDeck';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('CreateDeck', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData());
  });

  it('should add deck', () => {
    new CreateDeck(this.storage).execute({ name: 'One', description: 'Deck one' });
    expect(this.storage.data.decks).toHaveLength(1);
    expect(this.storage.data.decks[0]).toMatchObject({
      name: 'One',
      description: 'Deck one'
    });
  });

  it('adding deck with predefined cards should have no effect', () => {
    const deck = new CreateDeck(this.storage).execute({ name: 'One', description: 'Deck one', cards: [1, 2, 3] });
    expect(deck).toMatchObject({
      name: 'One', description: 'Deck one', cards: []
    });
  });

  it('adding deck with predefined id should have no effect', () => {
    const deck = new CreateDeck(this.storage).execute({ id: 100, name: 'One', description: 'Deck one' });
    expect(deck.id).not.toBe(100);
  });

});

describe('Name is not optional', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData());
  });

  it('should throw an error when name is undefined', () => {
    expect(() => new CreateDeck({ description: 'One' }).execute()).toThrow();
  });
  
  it('should throw an error when name is null', () => {
    expect(() => new CreateDeck({ name: null, description: 'One' }).execute()).toThrow();
  });

  it('should throw an error when name is empty', () => {
    expect(() => new CreateDeck({ name: '', description: 'One' }).execute()).toThrow();
  });

  it('should throw an error when name contains only spaces', () => {
    expect(() => new CreateDeck({ name: ' ', description: 'One' }).execute()).toThrow();
  });

});

describe('Description is optional', function() {
  
  beforeAll(() => {
    this.storage = new MockStorage(MockData());
  });

  it('should accept when description is undefined', () => {
    const deck = new CreateDeck(this.storage).execute({ name: 'Deck' });
    expect(deck).toBeDefined();
  });

  it('should accept when description is null', () => {
    const deck = new CreateDeck(this.storage).execute({ name: 'Deck', description: null });
    expect(deck).toBeDefined();
  });

  it('should accept when description is empty', () => {
    const deck = new CreateDeck(this.storage).execute({ name: 'Deck', description: '' });
    expect(deck).toBeDefined();
  });

  it('should accept when description contains only spaces', () => {
    const deck = new CreateDeck(this.storage).execute({ name: 'Deck', description: ' ' });
    expect(deck).toBeDefined();
  });
  
});
  