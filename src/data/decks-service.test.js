import Service, { InMemoryStorageEngine, LocalStorageEngine, FakeLocalStorage } from './decks-service';
import Deck from './deck';
import { OrderedMap, List } from 'immutable';

describe('DecksService', function () {

  beforeEach(() => {
    Service.engine.reset();
  });

  it('adding deck with success', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(added => {
      expect(added).toEqual(new Deck({
        id: 1,
        name: 'One',
        description: 'Deck one'
      }));
    });
  });

  it('adding deck without description with success', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: 'One' })).then(added => {
      expect(added).toEqual(new Deck({
        id: 1,
        name: 'One',
        description: null
      }));
    });
  });

  it('adding two decks with success', () => {
    expect.assertions(2);
    Service.addDeck(new Deck({ name: 'One' })).then(first => {
      Service.addDeck(new Deck({ name: 'Two' })).then(second => {
        expect(first).toEqual(new Deck({
          id: 1,
          name: 'One',
          description: null
        }));
        expect(second).toEqual(new Deck({
          id: 2,
          name: 'Two',
          description: null
        }));
      });
    });
  });

  it('adding deck with empty name shoud fail', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: '' })).catch(error => {
      expect(error).not.toBeNull();
    });
  });

  it('removing deck with success', () => {
    expect.assertions(2);
    Service.addDeck(new Deck({ name: 'One' })).then(added => {
      expect(added.id).toBe(1);
      Service.removeDeck(added.id).then(removed => {
        expect(removed).toEqual(new Deck({
          id: 1,
          name: 'One',
          description: null
        }));
      });
    });
  });

  it('updating deck with success', () => {
    expect.assertions(2);
    Service.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(deck => {
      deck = deck.set('name', 'New one');
      Service.updateDeck(deck).then(updated => {
        expect(updated).toEqual(new Deck({
          id: 1,
          name: 'New one',
          description: 'Deck one'
        }));
        expect(Service.fetchAllDecks()).resolves.toEqual(List([
          new Deck({ id: 1, name: 'New one', description: 'Deck one' })
        ]));
      });
    });
  });

  it('updating deck non added should fail', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: 'One' })).then(() => {
      expect(Service.updateDeck(new Deck({ id: 2, name: 'Two' }))).rejects.toBeDefined();
    });
  });

  it('updating deck with a new invalid one should fail', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: 'One' })).then(() => {
      expect(Service.updateDeck(new Deck({ id: 1 }))).rejects.toBeDefined();
    });
  });

  it('fetching all decks', () => {
    expect.assertions(1);
    Service.addDeck(new Deck({ name: 'One' })).then(() => {
      Service.addDeck(new Deck({ name: 'Two' })).then(() => {
        Service.fetchAllDecks().then(decks => {
          expect(decks).toEqual(List([
            new Deck({ id: 1, name: 'One' }),
            new Deck({ id: 2, name: 'Two' })
          ]));
        });
      });
    });
  });

  it('fetching deck by id', () => {
    expect.assertions(2);
    Service.addDeck(new Deck({ name: 'One' })).then(() => {
      Service.addDeck(new Deck({ name: 'Two' })).then(() => {
        Service.fetchDeckById(1).then(deck => expect(deck).toEqual(new Deck({ id: 1, name: 'One' })));
        Service.fetchDeckById(2).then(deck => expect(deck).toEqual(new Deck({ id: 2, name: 'Two' })));
      });
    });
  });

});

describe('InMemoryStorageEngine', function () {

  it('adding deck with success', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(1);
    expect(engine.addDeck(new Deck({ name: 'One', description: 'Deck one' }))).resolves.toEqual(new Deck({
      id: 1,
      name: 'One',
      description: 'Deck one'
    }));
  });

  it('adding two decks with success', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(2);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(first => {
      engine.addDeck(new Deck({ name: 'Two', description: 'Deck two' })).then(second => {
        expect(first).toEqual(new Deck({ id: 1, name: 'One', description: 'Deck one' }));
        expect(second).toEqual(new Deck({ id: 2, name: 'Two', description: 'Deck two' }));
      });
    });
  });

  it('adding deck with no description should pass', () => {
    const engine = new InMemoryStorageEngine();
    engine.addDeck(new Deck({ name: 'One' })).then(added => {
      expect(added).toEqual(new Deck({
        id: 1,
        name: 'One',
        description: null
      }));
    });
  });

  it('adding deck with no name should fail', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(1);
    expect(engine.addDeck(new Deck({ description: 'Deck one' }))).rejects.toBeDefined();
  });

  it('removing deck', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      '1': new Deck({ id: 1, name: 'One' })
    });
    expect.assertions(1);
    expect(engine.removeDeck(1)).resolves.toEqual(new Deck({
      id: 1,
      name: 'One',
      description: null
    }));
  });

  it('updating deck with success', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      '1': new Deck({ id: 1, name: 'One', description: 'Deck one' })
    });
    expect.assertions(2);
    engine.updateDeck(new Deck({ id: 1, name: 'Two', description: 'Deck one' })).then(updated => {
      expect(updated).toEqual(new Deck({ id: 1, name: 'Two', description: 'Deck one' }));
      expect(engine._decks.get('1')).toEqual(updated);
    });
  });

  it('updating non added deck should fail', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({ '1': new Deck({ id: 1, name: 'One', description: 'Deck one' }) });
    expect(engine.updateDeck(new Deck({ id: 2, name: 'Two', description: 'Deck two' }))).rejects.toBeDefined();
  });

  it('updating deck with invalid name should fail', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({ '1': new Deck({ id: 1, name: 'One', description: 'Deck one' }) });
    expect(engine.updateDeck(new Deck({ id: 1, name: '', description: 'Two' }))).rejects.toBeDefined();
  });

  it('fetching all decks', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      1: new Deck({ id: 1, name: 'One', description: 'Deck one' }),
      2: new Deck({ id: 2, name: 'Two', description: 'Deck two' })
    });
    expect.assertions(1);
    expect(engine.fetchAllDecks()).resolves.toEqual(List([
      new Deck({ id: 1, name: 'One', description: 'Deck one' }),
      new Deck({ id: 2, name: 'Two', description: 'Deck two' })
    ]));
  });

  it('fetching deck by id', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      1: new Deck({ id: 1, name: 'One', description: 'Deck one' }),
      2: new Deck({ id: 2, name: 'Two', description: 'Deck two' })
    });
    expect.assertions(2);
    expect(engine.fetchDeckById(1)).resolves.toEqual(new Deck({ id: 1, name: 'One', description: 'Deck one' }));
    expect(engine.fetchDeckById(2)).resolves.toEqual(new Deck({ id: 2, name: 'Two', description: 'Deck two' }));
  });

});

describe('LocalStorageEngine', function () {

  beforeEach(() => {
    window.localStorage = new FakeLocalStorage();
  });

  it('getting decks as object', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(1);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(() => {
      engine.addDeck(new Deck({ name: 'Two', description: 'Deck two' })).then(() => {
        expect(engine.decksObject).toEqual({
          '1': { id: 1, name: 'One', description: 'Deck one' },
          '2': { id: 2, name: 'Two', description: 'Deck two' }
        });
      });
    });
  });

  it('getting decks as json', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(1);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(() => {
      engine.addDeck(new Deck({ name: 'Two', description: 'Deck two' })).then(() => {
        expect(JSON.parse(engine.decksJson)).toEqual({
          '1': { id: 1, name: 'One', description: 'Deck one' },
          '2': { id: 2, name: 'Two', description: 'Deck two' }
        });
      });
    });
  });

  it('getting last deck id', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(1);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(() => {
      engine.addDeck(new Deck({ name: 'Two', description: 'Deck two' })).then(() => {
        expect(engine.lastDeckId).toBe(2);
      });
    });
  });

  it('adding deck with success', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(() => {
      expect(JSON.parse(engine.decksJson)).toEqual({
        '1': { id: 1, name: 'One', description: 'Deck one' }
      });
      expect(parseInt(engine.lastDeckId)).toEqual(1);
    });
  });

  it('adding two decks with success', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.addDeck(new Deck({ name: 'One', description: 'Deck one' })).then(() => {
      engine.addDeck(new Deck({ name: 'Two', description: 'Deck two' })).then(() => {
        expect(JSON.parse(engine.decksJson)).toEqual({
          '1': { id: 1, name: 'One', description: 'Deck one' },
          '2': { id: 2, name: 'Two', description: 'Deck two' }
        });
        expect(parseInt(engine.lastDeckId, 10)).toEqual(2);
      });
    });
  });

  it('adding deck with no description should pass', () => {
    const engine = new LocalStorageEngine();
    engine.addDeck(new Deck({ id: 1, name: 'One' })).then(added => {
      expect(added).toEqual(new Deck({ id: 1, name: 'One', description: null }));
      expect(JSON.parse(engine.decksJson)).toEqual({
        '1': { id: 1, name: 'One', description: null }
      });
    });
  });

  it('adding deck with no name should fail', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.addDeck(new Deck({ description: 'Deck one' })).catch(error => {
      expect(error).toBeDefined();
      expect(engine.decksJson).toEqual('{}');
    });
  });

  it('data should be loaded on create object', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' },
      { id: 2, name: 'Two', description: 'Deck two' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '2');
    const engine = new LocalStorageEngine();
    expect(JSON.parse(engine.decksJson)).toEqual({
      '1': { id: 1, name: 'One', description: 'Deck one' },
      '2': { id: 2, name: 'Two', description: 'Deck two' }
    });
    expect(parseInt(engine.lastDeckId)).toEqual(2);
  });

  it('removing deck with success', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' },
      { id: 2, name: 'Two', description: 'Deck two' },
      { id: 3, name: 'Three', description: 'Deck three' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '3');
    const engine = new LocalStorageEngine();
    engine.removeDeck(1).then(() => {
      expect(engine.decksObject).toEqual({
        '2': { id: 2, name: 'Two', description: 'Deck two' },
        '3': { id: 3, name: 'Three', description: 'Deck three' }
      });
    });
  });

  it('updating deck with success', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '1');
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.updateDeck(new Deck({ id: 1, name: 'Two', description: 'New description' })).then(updated => {
      expect(updated).toEqual(new Deck({ id: 1, name: 'Two', description: 'New description' }));
      expect(engine.decksObject).toEqual({
        '1': { id: 1, name: 'Two', description: 'New description' }
      });
    });
  });

  it('updating non added deck should fail', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '1');
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.updateDeck(new Deck({ id: 2, name: 'Two' })).catch(error => {
      expect(error).toBeDefined();
      expect(engine.decksObject).toEqual({
        '1': { id: 1, name: 'One', description: 'Deck one' }
      });
    });
  });

  it('updating with deck without name should fail', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '1');
    const engine = new LocalStorageEngine();
    engine.updateDeck({ id: 1, description: 'Deck two' }).catch(error => {
      expect(error).toBeDefined();
      expect(engine.decksObject).toEqual({
        '1': { id: 1, name: 'One', description: 'Deck one' }
      });
    });
  });

  it('fetching all decks', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' },
      { id: 2, name: 'Two', description: 'Deck two' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '2');
    const engine = new LocalStorageEngine();
    expect.assertions(1);
    expect(engine.fetchAllDecks()).resolves.toEqual(List([
      new Deck({ id: 1, name: 'One', description: 'Deck one' }),
      new Deck({ id: 2, name: 'Two', description: 'Deck two' })
    ]));
  });

  it('fetching deck by id', () => {
    window.localStorage.setItem(LocalStorageEngine.decksKey, JSON.stringify([
      { id: 1, name: 'One', description: 'Deck one' },
      { id: 2, name: 'Two', description: 'Deck two' }
    ]));
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '2');
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    expect(engine.fetchDeckById(1)).resolves.toEqual(new Deck({ id: 1, name: 'One', description: 'Deck one' }));
    expect(engine.fetchDeckById(2)).resolves.toEqual(new Deck({ id: 2, name: 'Two', description: 'Deck two' }));
  });

});
