import AddDeck from './AddDeck';
import Storage from '../storage';

describe('dao.AddDeck', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('adding deck with success', () => {
    new AddDeck({ name: 'One', description: 'Deck one' }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

  it('adding deck with invalid name should fail', () => {
    expect(() => new AddDeck({ description: 'One' }).execute()).toThrow();
    expect(() => new AddDeck({ name: null, description: 'One' }).execute()).toThrow();
    expect(() => new AddDeck({ name: undefined, description: 'One' }).execute()).toThrow();
    expect(() => new AddDeck({ name: '', description: 'One' }).execute()).toThrow();
    expect(() => new AddDeck({ name: '  ', description: 'One' }).execute()).toThrow();
  });

  it('adding deck without description should pass', () => {
    expect(() => new AddDeck({ name: 'One' }).execute()).not.toThrow();
    expect(() => new AddDeck({ name: 'One', description: null }).execute()).not.toThrow();
    expect(() => new AddDeck({ name: 'One', description: undefined }).execute()).not.toThrow();
    expect(() => new AddDeck({ name: 'One', description: '' }).execute()).not.toThrow();
    expect(() => new AddDeck({ name: 'One', description: '   ' }).execute()).not.toThrow();
  });

  it('adding deck with predefined cards should have no effect', () => {
    new AddDeck({ name: 'One', description: 'Deck one', cards: [1, 2, 3] }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

  it('adding deck with predefined id should have no effect', () => {
    new AddDeck({ id: 123, name: 'One', description: 'Deck one' }).execute();
    expect(Storage.data.decks).toEqual([
      { id: 1, name: 'One', description: 'Deck one', cards: [] }
    ]);
  });

});
