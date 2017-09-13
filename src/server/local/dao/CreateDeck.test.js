import CreateDeck from './CreateDeck';
import Storage from '../storage';

describe('dao.CreateDeck', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('adding deck with success', () => {
    new CreateDeck({ name: 'One', description: 'Deck one' }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

  it('adding deck with invalid name should fail', () => {
    expect(() => new CreateDeck({ description: 'One' }).execute()).toThrow();
    expect(() => new CreateDeck({ name: null, description: 'One' }).execute()).toThrow();
    expect(() => new CreateDeck({ name: undefined, description: 'One' }).execute()).toThrow();
    expect(() => new CreateDeck({ name: '', description: 'One' }).execute()).toThrow();
    expect(() => new CreateDeck({ name: '  ', description: 'One' }).execute()).toThrow();
  });

  it('adding deck without description should pass', () => {
    expect(() => new CreateDeck({ name: 'One' }).execute()).not.toThrow();
    expect(() => new CreateDeck({ name: 'One', description: null }).execute()).not.toThrow();
    expect(() => new CreateDeck({ name: 'One', description: undefined }).execute()).not.toThrow();
    expect(() => new CreateDeck({ name: 'One', description: '' }).execute()).not.toThrow();
    expect(() => new CreateDeck({ name: 'One', description: '   ' }).execute()).not.toThrow();
  });

  it('adding deck with predefined cards should have no effect', () => {
    new CreateDeck({ name: 'One', description: 'Deck one', cards: [1, 2, 3] }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

  it('adding deck with predefined id should have no effect', () => {
    new CreateDeck({ id: 123, name: 'One', description: 'Deck one' }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

});
