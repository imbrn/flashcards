import Service, { InMemoryStorageEngine, LocalStorageEngine, FakeLocalStorage } from './decks-service';
import Deck from './deck';
import { OrderedMap, List } from 'immutable';

describe('DecksService', function () {

  beforeEach(() => {
    Service.engine.reset();
  });

  it('adding deck with success', () => {
    expect.assertions(1);
    Service.addDeck({ name: 'One', description: 'Deck one' }).then(added => {
      expect(added).toEqual(new Deck({
        id: 1,
        name: 'One',
        description: 'Deck one'
      }));
    });
  });

  it('adding deck without description with success', () => {
    expect.assertions(1);
    Service.addDeck({ name: 'One' }).then(added => {
      expect(added).toEqual(new Deck({
        id: 1,
        name: 'One',
        description: null
      }));
    });
  });

  it('adding two decks with success', () => {
    expect.assertions(2);
    Service.addDeck({ name: 'One' }).then(first => {
      Service.addDeck({ name: 'Two' }).then(second => {
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
    Service.addDeck({ name: '' }).catch(error => {
      expect(error).not.toBeNull();
    });
  });

  it('removing deck with success', () => {
    expect.assertions(2);
    Service.addDeck({ name: 'One' }).then(added => {
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

  it('fetching all decks', () => {
    expect.assertions(1);
    Service.addDeck({ name: 'One' }).then(() => {
      Service.addDeck({ name: 'Two' }).then(() => {
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
    Service.addDeck({ name: 'One' }).then(() => {
      Service.addDeck({ name: 'Two' }).then(() => {
        Service.fetchDeckById(1).then(deck => expect(deck).toEqual(new Deck({ id: 1, name: 'One' })));
        Service.fetchDeckById(2).then(deck => expect(deck).toEqual(new Deck({ id: 2, name: 'Two' })));
      });
    });
  });

});

describe('InMemoryStorageEngine', function () {

  it('adding deck', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(1);
    expect(engine.addDeck({ name: 'One' })).resolves.toEqual(new Deck({
      id: 1,
      name: 'One',
      description: null
    }));
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
    engine.addDeck({ name: 'One', description: 'Deck one' }).then(() => {
      engine.addDeck({ name: 'Two', description: 'Deck two' }).then(() => {
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
    engine.addDeck({ name: 'One', description: 'Deck one' }).then(() => {
      engine.addDeck({ name: 'Two', description: 'Deck two' }).then(() => {
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
    engine.addDeck({ name: 'One', description: 'Deck one' }).then(() => {
      engine.addDeck({ name: 'Two', description: 'Deck two' }).then(() => {
        expect(engine.lastDeckId).toBe(2);
      });
    });
  });

  it('adding deck with success', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.addDeck({ name: 'One' }).then(() => {
      expect(JSON.parse(engine.decksJson)).toEqual({
        '1': { id: 1, name: 'One', description: null }
      });
      expect(parseInt(engine.lastDeckId)).toEqual(1);
    });
  });

  it('adding two decks with success', () => {
    const engine = new LocalStorageEngine();
    expect.assertions(2);
    engine.addDeck({ name: 'One' }).then(() => {
      engine.addDeck({ name: 'Two', description: 'Deck two' }).then(() => {
        expect(JSON.parse(engine.decksJson)).toEqual({
          '1': { id: 1, name: 'One', description: null },
          '2': { id: 2, name: 'Two', description: 'Deck two' }
        });
        expect(parseInt(engine.lastDeckId, 10)).toEqual(2);
      });
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
    window.localStorage.setItem(LocalStorageEngine.lastDeckIdKey, '2');
    const engine = new LocalStorageEngine();
    engine.removeDeck(1).then(() => {
      expect(engine.decksObject).toEqual({
        '2': { id: 2, name: 'Two', description: 'Deck two' },
        '3': { id: 3, name: 'Three', description: 'Deck three' }
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
