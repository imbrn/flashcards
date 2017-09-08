import Data from './Data';

describe('Data', function() {

  it('constructing without parameters', () => {
    const data = new Data();
    expect(data.decks).toEqual([]);
    expect(data.cards).toEqual([]);
    expect(data.lastDeckId).toEqual(0);
    expect(data.lastCardId).toEqual(0);
  });

  it('constructing with invalid js object', () => {
    const data = new Data({ other: 'other' });
    expect(data.decks).toEqual([]);
    expect(data.cards).toEqual([]);
    expect(data.lastDeckId).toEqual(0);
    expect(data.lastCardId).toEqual(0);
  });

  it('constructing with valid js object', () => {
    const values = {
      decks: [1, 2, 3],
      cards: [4, 5, 6],
      lastDeckId: 7,
      lastCardId: 8
    };
    const data = new Data(values);
    expect(data.decks).toEqual(values.decks);
    expect(data.cards).toEqual(values.cards);
    expect(data.lastDeckId).toEqual(values.lastDeckId);
    expect(data.lastCardId).toEqual(values.lastCardId);
  });

  it('inserting deck', () => {
    const data = new Data();
    data.insertDeck({ name: 'One', description: 'Deck one' });
    expect(data.decks[0]).toEqual({
      id: 1,
      name: 'One',
      description: 'Deck one',
      cards: []
    });
  });

  it('deck id is auto generated', () => {
    const data = new Data();
    const deck = data.insertDeck({ id: 500, name: 'One' });
    expect(deck).toMatchObject({
      id: 1,
      name: 'One'
    });
  });

  it('inserting card', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'Front', back: 'Back' });
    expect(data.decks[0]).toMatchObject({ cards: [card.id] });
    expect(data.cards[0]).toEqual({
      id: 1,
      front: 'Front',
      back: 'Back',
      deck: 1
    });
  });

  it('inserting card in non added deck should fail', () => {
    const data = new Data();
    expect(() => data.insertCard(1, { front: 'Front', back: 'Back' })).toThrow();
  });

  it('deleting deck without cards', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    expect(data.decks).toHaveLength(1);
    data.deleteDeck(deck.id);
    expect(data.decks).toHaveLength(0);
  });

  it('deleting deck with cards should also delete them', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    data.insertCard(deck.id, { front: 'A', back: 'B' });
    data.insertCard(deck.id, { front: 'C', back: 'D' });
    expect(data.decks).toHaveLength(1);
    expect(data.cards).toHaveLength(2);
    data.deleteDeck(deck.id);
    expect(data.decks).toHaveLength(0);
    expect(data.cards).toHaveLength(0);
  });

  it('updating deck', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One', description: 'Deck one' });
    const updated = data.updateDeck(deck.id, { name: 'Two', description: 'Deck two' });
    expect(updated).toEqual({
      id: 1,
      name: 'Two',
      description: 'Deck two',
      cards: []
    });
  });

  it('updating deck name', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One', description: 'One' });
    const updated = data.updateDeck(deck.id, { name: 'Two' });
    expect(updated).toMatchObject({
      name: 'Two',
      description: 'One'
    });
  });

  it('updating deck description', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One', description: 'One' });
    const updated = data.updateDeck(deck.id, { description: 'Two' });
    expect(updated).toMatchObject({
      name: 'One',
      description: 'Two'
    });
  });

  it('updating deck id has no effect', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const updated = data.updateDeck(deck.id, { id: 50 });
    expect(updated).toMatchObject({
      id: deck.id
    });
  });

  it('updating deck cards has no effect', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateDeck(deck.id, { cards: [] });
    expect(updated).toMatchObject({
      cards: deck.cards
    });
  });

  it('finding deck by id', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    expect(data.findDeckById(deck.id)).toEqual(deck);
  });

  it('searching for id of non added deck should return undefined', () => {
    const data = new Data();
    expect(data.findDeckById(1)).toEqual(undefined);
  });

  it('find all decks', () => {
    const data = new Data();
    const one = data.insertDeck({ name: 'One' });
    const two = data.insertDeck({ name: 'Two' });
    expect(data.findAllDecks()).toEqual([one, two]);
  });

  it('deleting card', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    data.insertCard(deck.id, { front: 'A' });
    data.insertCard(deck.id, { front: 'B' });
    expect(data.cards).toHaveLength(2);
    expect(deck.cards).toHaveLength(2);
  });

  it('deleting card should also remove its reference from deck parent', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'Front' });
    expect(data.cards).toHaveLength(1);
    expect(deck.cards).toHaveLength(1);
    data.deleteCard(card.id);
    expect(data.cards).toHaveLength(0);
    expect(deck.cards).toHaveLength(0);
  });

  it('updating card', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateCard(card.id, { front: 'C', back: 'D' });
    expect(updated).toEqual({
      id: card.id,
      front: 'C',
      back: 'D',
      deck: deck.id
    });
  });

  it('updating card front', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateCard(card.id, { front: 'C' });
    expect(updated).toMatchObject({
      front: 'C',
      back: 'B',
    });
  });

  it('updating card back', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateCard(card.id, { back: 'C' });
    expect(updated).toMatchObject({
      front: 'A',
      back: 'C',
    });
  });

  it('updating card id has no effect', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateCard(card.id, { id: 300 });
    expect(updated).toMatchObject({
      id: card.id
    });
  });

  it('updating card deck reference has no effect', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const updated = data.updateCard(card.id, { deck: 200 });
    expect(updated).toMatchObject({
      deck: deck.id
    });
  });

  it('finding card by id', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const card = data.insertCard(deck.id, { front: 'A', back: 'B' });
    expect(data.findCardById(card.id)).toEqual(card);
  });

  it('searching for id of non addded card should return undefind', () => {
    const data = new Data();
    expect(data.findCardById(1)).toEqual(undefined);
  });

  it('finding all cards for a deck', () => {
    const data = new Data();
    const deck = data.insertDeck({ name: 'One' });
    const one = data.insertCard(deck.id, { front: 'A', back: 'B' });
    const two = data.insertCard(deck.id, { front: 'A', back: 'B' });
    expect(data.findAllCards(deck.id)).toEqual([one, two]);
  });

});
