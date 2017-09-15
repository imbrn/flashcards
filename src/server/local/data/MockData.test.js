import MockData from './MockData';
import Deck from './Deck';
import Card from './Card';

describe('all properties set', function() {
  
  beforeAll(() => {
    this.data = MockData({
      decksCount: 2,
      cardsPerDeck: 3,
      deckNamePattern: 'D${id}',
      deckDescriptionPattern: 'The D${id}',
      cardFrontPattern: 'F${id}',
      cardBackPattern: 'B${id}'
    });
  });

  it('should have correct decks count', () => {
    expect(this.data.decks).toHaveLength(2);
  });

  it('should have correct decks data', () => {
    expect(this.data.decks).toEqual([
      Deck({ id: 1, name: 'D1', description: 'The D1', cards: [1, 2, 3] }),
      Deck({ id: 2, name: 'D2', description: 'The D2', cards: [4, 5, 6] })
    ]);
  });

  it('should have correct cards count', () => {
    expect(this.data.cards).toHaveLength(2 * 3);
  });

  it('should have correct cards data', () => {
    expect(this.data.cards).toEqual([
      Card({ id: 1, front: 'F1', back: 'B1', deck: 1 }),
      Card({ id: 2, front: 'F2', back: 'B2', deck: 1 }),
      Card({ id: 3, front: 'F3', back: 'B3', deck: 1 }),
      Card({ id: 4, front: 'F4', back: 'B4', deck: 2 }),
      Card({ id: 5, front: 'F5', back: 'B5', deck: 2 }),
      Card({ id: 6, front: 'F6', back: 'B6', deck: 2 })
    ]);
  });

});

describe('all default properties', function() {

  beforeAll(() => {
    this.data = MockData();
  });

  it('should have one decks', () => {
    expect(this.data.decks).toHaveLength(0);
  });

  it('should have two cards', () => {
    expect(this.data.cards).toHaveLength(0);
  });

});

describe('default decks and cards data', function() {

  beforeAll(() => {
    this.data = MockData({ decksCount: 1, cardsPerDeck: 2 });
  });

  it('should have correct decks data', () => {
    expect(this.data.decks).toEqual([
      Deck({ id: 1, name: 'Deck 1', description: 'The deck 1', cards: [1, 2] })
    ]);
  });

  it('should have correct cards data', () => {
    expect(this.data.cards).toEqual([
      Card({ id: 1, front: 'Front 1', back: 'Back 1', deck: 1 }),
      Card({ id: 2, front: 'Front 2', back: 'Back 2', deck: 1 })
    ]);
  });

});
