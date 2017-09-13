import Deck from './Deck';

describe('Deck', function() {

  it('creating deck', () => {
    const deck = Deck({
      id: 3,
      name: 'One',
      description: 'Deck one',
      cards: [1, 2, 3]
    });
    expect(deck).toEqual({
      id: 3,
      name: 'One',
      description: 'Deck one',
      cards: [1, 2, 3]
    });
  });

  it('default properties are always created', () => {
    const deck = Deck();
    expect(deck).toEqual({
      id: null,
      name: null,
      description: null,
      cards: []
    });
  });

  it('invalid properties are ignored', () => {
    const deck = Deck({
      invalid: 'invalid'
    });
    expect(deck).not.toHaveProperty('invalid');
  });

  it('should trim name', () => {
    const deck = Deck({ name: '   One    '});
    expect(deck).toEqual(Deck({ name: 'One' }));
  });

  it('should trim description', () => {
    const deck = Deck({ description: '   One   '});
    expect(deck).toEqual(Deck({ description: 'One' }));
  });

});
