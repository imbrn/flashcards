import Data from './Data';
import Deck from './Deck';
import Card from './Card';

describe('Data', function() {

  it('creating data', () => {
    const data = Data({
      decks: [Deck({ name: 'One' }), Deck({ name: 'Two' })],
      cards: [Card({ front: 'A', back: 'B' }), Card({ front: 'C', back: 'D' })],
      lastDeckId: 5,
      lastCardId: 6
    });
    expect(data).toEqual({
      decks: [Deck({ name: 'One' }), Deck({ name: 'Two' })],
      cards: [Card({ front: 'A', back: 'B' }), Card({ front: 'C', back: 'D' })],
      lastDeckId: 5,
      lastCardId: 6
    });
  });

  it('valid properties are always created', () => {
    const data = Data();
    expect(data).toEqual({
      decks: [],
      cards: [],
      lastDeckId: 0,
      lastCardId: 0
    });
  });

  it('invalid properties are ignored', () => {
    const data = Data({
      invalid: 'invalid'
    });
    expect(data).not.toHaveProperty('invalid');
  });

});
