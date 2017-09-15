import MockDeck from './MockDeck';
import Deck from './Deck';

describe('all properties set', function() {

  it('should create a valid deck', () => {
    const deck = MockDeck({
      id: 3,
      firstCardId: 5,
      cardsCount: 2,
      namePattern: 'My deck ${id}',
      descriptionPattern: 'This is deck ${id}'
    });

    expect(deck).toEqual(Deck({
      id: 3,
      cards: [ 5, 6 ],
      name: 'My deck 3',
      description: 'This is deck 3'
    }));
  });

});

describe('default properties', function() {

  beforeAll(() => {
    this.deck = MockDeck({
      id: 2
    });
  });

  it('cardId start with 1', () => {
    expect(this.deck.cards[0]).toBe(1);
  });

  it('have two cards', () => {
    expect(this.deck.cards).toHaveLength(2);
  });

  it('name is correct', () => {
    expect(this.deck.name).toBe('Deck 2');
  });

  it('description is correct', () => {
    expect(this.deck.description).toBe('The deck 2');
  });

});
