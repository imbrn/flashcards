import Service, { InMemoryStorageEngine, LocalStorageEngine, FakeLocalStorage } from './DecksService';
import DeckModel from './DeckModel';
import CardModel from './CardModel';
import { OrderedMap, List } from 'immutable';

describe('DecksService', function() {

  beforeEach(() => {
    Service.engine.reset();
  });

  it('adding deck with success', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: 'One', description: 'Deck one' })).then(added => {
      expect(added).toEqual(new DeckModel({
        id: 1,
        name: 'One',
        description: 'Deck one'
      }));
    });
  });

  it('adding deck without description with success', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: 'One' })).then(added => {
      expect(added).toEqual(new DeckModel({
        id: 1,
        name: 'One',
        description: null
      }));
    });
  });

  it('adding two decks with success', () => {
    expect.assertions(2);
    Service.addDeck(new DeckModel({ name: 'One' })).then(first => {
      Service.addDeck(new DeckModel({ name: 'Two' })).then(second => {
        expect(first).toEqual(new DeckModel({
          id: 1,
          name: 'One',
          description: null
        }));
        expect(second).toEqual(new DeckModel({
          id: 2,
          name: 'Two',
          description: null
        }));
      });
    });
  });

  it('adding deck with empty name shoud fail', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: '' })).catch(error => {
      expect(error).not.toBeNull();
    });
  });

  it('removing deck with success', () => {
    expect.assertions(2);
    Service.addDeck(new DeckModel({ name: 'One' })).then(added => {
      expect(added.id).toBe(1);
      Service.removeDeck(added.id).then(removed => {
        expect(removed).toEqual(new DeckModel({
          id: 1,
          name: 'One',
          description: null
        }));
      });
    });
  });

  it('updating deck with success', () => {
    expect.assertions(2);
    Service.addDeck(new DeckModel({ name: 'One', description: 'Deck one' })).then(deck => {
      deck = deck.set('name', 'New one');
      Service.updateDeck(deck).then(updated => {
        expect(updated).toEqual(new DeckModel({
          id: 1,
          name: 'New one',
          description: 'Deck one'
        }));
        expect(Service.fetchAllDecks()).resolves.toEqual(OrderedMap({
          '1': new DeckModel({ id: 1, name: 'New one', description: 'Deck one' })
        }));
      });
    });
  });

  it('updating deck non added should fail', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: 'One' })).then(() => {
      expect(Service.updateDeck(new DeckModel({ id: 2, name: 'Two' }))).rejects.toBeDefined();
    });
  });

  it('updating deck with a new invalid one should fail', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: 'One' })).then(() => {
      expect(Service.updateDeck(new DeckModel({ id: 1 }))).rejects.toBeDefined();
    });
  });

  it('fetching all decks', () => {
    expect.assertions(1);
    Service.addDeck(new DeckModel({ name: 'One' })).then(() => {
      Service.addDeck(new DeckModel({ name: 'Two' })).then(() => {
        Service.fetchAllDecks().then(decks => {
          expect(decks).toEqual(OrderedMap({
            '1': new DeckModel({ id: 1, name: 'One' }),
            '2': new DeckModel({ id: 2, name: 'Two' })
          }));
        });
      });
    });
  });

  it('fetching deck by id', () => {
    expect.assertions(2);
    Service.addDeck(new DeckModel({ name: 'One' })).then(() => {
      Service.addDeck(new DeckModel({ name: 'Two' })).then(() => {
        Service.fetchDeckById(1).then(deck => expect(deck).toEqual(new DeckModel({ id: 1, name: 'One' })));
        Service.fetchDeckById(2).then(deck => expect(deck).toEqual(new DeckModel({ id: 2, name: 'Two' })));
      });
    });
  });

});

describe('InMemoryStorageEngine', function() {

  it('adding deck with success', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(1);
    expect(engine.addDeck(new DeckModel({ name: 'One', description: 'Deck one' }))).resolves.toEqual(new DeckModel({
      id: 1,
      name: 'One',
      description: 'Deck one'
    }));
  });

  it('adding two decks with success', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(2);
    engine.addDeck(new DeckModel({ name: 'One', description: 'Deck one' })).then(first => {
      engine.addDeck(new DeckModel({ name: 'Two', description: 'Deck two' })).then(second => {
        expect(first).toEqual(new DeckModel({ id: 1, name: 'One', description: 'Deck one' }));
        expect(second).toEqual(new DeckModel({ id: 2, name: 'Two', description: 'Deck two' }));
      });
    });
  });

  it('adding deck with no description should pass', () => {
    const engine = new InMemoryStorageEngine();
    engine.addDeck(new DeckModel({ name: 'One' })).then(added => {
      expect(added).toEqual(new DeckModel({
        id: 1,
        name: 'One',
        description: null,
      }));
    });
  });

  it('adding deck with no name should fail', () => {
    const engine = new InMemoryStorageEngine();
    expect.assertions(1);
    expect(engine.addDeck(new DeckModel({ description: 'Deck one' }))).rejects.toBeDefined();
  });

  it('removing deck', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      '1': new DeckModel({ id: 1, name: 'One' })
    });
    expect.assertions(1);
    expect(engine.removeDeck(1)).resolves.toEqual(new DeckModel({
      id: 1,
      name: 'One',
      description: null
    }));
  });

  it('updating deck with success', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      '1': new DeckModel({ id: 1, name: 'One', description: 'Deck one' })
    });
    expect.assertions(2);
    engine.updateDeck(new DeckModel({ id: 1, name: 'Two', description: 'Deck one' })).then(updated => {
      expect(updated).toEqual(new DeckModel({ id: 1, name: 'Two', description: 'Deck one' }));
      expect(engine._decks.get('1')).toEqual(updated);
    });
  });

  it('updating non added deck should fail', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({ '1': new DeckModel({ id: 1, name: 'One', description: 'Deck one' }) });
    expect(engine.updateDeck(new DeckModel({ id: 2, name: 'Two', description: 'Deck two' }))).rejects.toBeDefined();
  });

  it('updating deck with invalid name should fail', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({ '1': new DeckModel({ id: 1, name: 'One', description: 'Deck one' }) });
    expect(engine.updateDeck(new DeckModel({ id: 1, name: '', description: 'Two' }))).rejects.toBeDefined();
  });

  it('fetching all decks', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      1: new DeckModel({ id: 1, name: 'One', description: 'Deck one' }),
      2: new DeckModel({ id: 2, name: 'Two', description: 'Deck two' })
    });
    expect.assertions(1);
    expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap({
      '1': new DeckModel({ id: 1, name: 'One', description: 'Deck one' }),
      '2': new DeckModel({ id: 2, name: 'Two', description: 'Deck two' })
    }));
  });

  it('fetching deck by id', () => {
    const engine = new InMemoryStorageEngine();
    engine._decks = OrderedMap({
      1: new DeckModel({ id: 1, name: 'One', description: 'Deck one' }),
      2: new DeckModel({ id: 2, name: 'Two', description: 'Deck two' })
    });
    expect.assertions(2);
    expect(engine.fetchDeckById(1)).resolves.toEqual(new DeckModel({ id: 1, name: 'One', description: 'Deck one' }));
    expect(engine.fetchDeckById(2)).resolves.toEqual(new DeckModel({ id: 2, name: 'Two', description: 'Deck two' }));
  });

});

describe('LocalStorageEngine', function() {

  beforeEach(() => {
    window.localStorage = new FakeLocalStorage();
  });

  it('saving decks', async () => {
    const engine = new LocalStorageEngine();

    await engine.addDeck(
      new DeckModel({ name: 'One', description: 'Deck one', cards: List([new CardModel({ front: 'A', back: 'B' })]) }));

    await engine.addDeck(
      new DeckModel({ name: 'Two', description: 'Deck two' }));

    expect(JSON.parse(LocalStorageEngine.localStorageDecks)).toEqual({
      '1': { id: 1, name: 'One', description: 'Deck one', cards: [{ front: 'A', back: 'B' }] },
      '2': { id: 2, name: 'Two', description: 'Deck two', cards: [] }
    });
  });

  it('loading decks', async () => {
    const engineOne = new LocalStorageEngine();

    await engineOne.addDeck(
      new DeckModel({ name: 'One', description: 'Deck one', cards: List([new CardModel({ front: 'A', back: 'B' })]) })
    );

    await engineOne.addDeck(new DeckModel({ name: 'Two', description: 'Deck two' }));

    const engineTwo = new LocalStorageEngine();
    await expect(engineTwo.fetchDeckById(1)).resolves.toEqual(
      new DeckModel({ id: 1, name: 'One', description: 'Deck one', cards: List([new CardModel({ front: 'A', back: 'B' })]) })
    );

    await expect(engineTwo.fetchDeckById(2)).resolves.toEqual(
      new DeckModel({ id: 2, name: 'Two', description: 'Deck two' })
    );
  });

  it('adding deck with success', async () => {
    const engine = new LocalStorageEngine();
    await expect(engine.addDeck(new DeckModel({ name: 'One', description: 'Deck one' }))).resolves
      .toEqual(new DeckModel({ id: 1, name: 'One', description: 'Deck one' }));
    await expect(engine.fetchDeckById(1)).resolves.toEqual(new DeckModel({ id: 1, name: 'One', description: 'Deck one' }));
  });

  it('adding two decks with success', async () => {
    const engine = new LocalStorageEngine();
    await engine.addDeck(new DeckModel({ name: 'One', description: 'Deck one' }));
    await engine.addDeck(new DeckModel({ name: 'Two', description: 'Deck two' }));
    await expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap({
      '1': new DeckModel({ id: 1, name: 'One', description: 'Deck one' }),
      '2': new DeckModel({ id: 2, name: 'Two', description: 'Deck two' })
    }));
  });

  it('adding a deck with no description should pass', async () => {
    const engine = new LocalStorageEngine();
    await expect(engine.addDeck(new DeckModel({ name: 'One' }))).resolves.toBeDefined();
    await expect(engine.fetchDeckById(1)).resolves.toEqual(new DeckModel({ id: 1, name: 'One' }));
  });

  it('adding a deck with no name should fail', async () => {
    const engine = new LocalStorageEngine();
    await expect(engine.addDeck(new DeckModel({ description: 'Deck one' }))).rejects.toBeDefined();
    await expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap());
  });

  it('removing deck with success', async () => {
    const engine = new LocalStorageEngine();
    const deck = await engine.addDeck(new DeckModel({ name: 'Deck one' }));
    await expect(engine.fetchAllDecks()).resolves.not.toEqual(OrderedMap());
    await expect(engine.removeDeck(deck.id)).resolves.toEqual(deck);
    await expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap());
  });

  it('removing non added should fail', async () => {
    const engine = new LocalStorageEngine();
    const added = await engine.addDeck(new DeckModel({ name: 'One' }));
    await expect(engine.removeDeck(added.id + 1)).rejects.toBeDefined();
    await expect(engine.fetchAllDecks()).resolves.toEqual(new OrderedMap({
      '1': added
    }));
  });

  it('updating deck with success', async () => {
    const engine = new LocalStorageEngine();
    const added = await engine.addDeck(new DeckModel({ name: 'One' }));
    await expect(engine.fetchDeckById(added.id)).resolves.toEqual(added);
    const updated = await engine.updateDeck(added.set('name', 'Two'));
    await expect(engine.fetchDeckById(added.id)).resolves.toEqual(updated);
  });

  it('updating non added deck should fail', async () => {
    const engine = new LocalStorageEngine();
    const added = await engine.addDeck(new DeckModel({ name: 'One' }));
    await expect(engine.updateDeck(added.id + 1)).rejects.toBeDefined();
    await expect(engine.fetchDeckById(added.id)).resolves.toEqual(added);
  });

  it('updating deck with no name should fail', async () => {
    const engine = new LocalStorageEngine();
    const added = await engine.addDeck(new DeckModel({ name: 'One' }));
    await expect(engine.updateDeck(added.set('name', ''))).rejects.toBeDefined();
    await expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap({
      '1': added
    }));
  });

  it('fetching all decks with success', async () => {
    const engine = new LocalStorageEngine();
    const deckOne = await engine.addDeck(new DeckModel({ name: 'One' }));
    const deckTwo = await engine.addDeck(new DeckModel({ name: 'Two' }));
    await expect(engine.fetchAllDecks()).resolves.toEqual(OrderedMap({
      '1': deckOne,
      '2': deckTwo
    }));
  });

  it('fetching deck by id', async () => {
    const engine = new LocalStorageEngine();
    const deckOne = await engine.addDeck(new DeckModel({name: 'Deck one'}));
    const deckTwo = await engine.addDeck(new DeckModel({name: 'Deck two'}));
    await expect(engine.fetchDeckById(deckOne.id)).resolves.toEqual(deckOne);
    await expect(engine.fetchDeckById(deckTwo.id)).resolves.toEqual(deckTwo);
  });

});
