import MockCard from './MockCard';
import Card from './Card';

describe('MockCard', function() {

  it('should create a card with success', () => {
    const card = MockCard({
      cardId: 2,
      deckId: 1,
      frontPattern: 'F${id}',
      backPattern: 'B${id}'
    });
    expect(card).toEqual(Card({
      id: 2,
      deck: 1,
      front: 'F2',
      back: 'B2'
    }));
  });

  it('should use default front pattern when not specified', () => {
    const card = MockCard({ cardId: 1, deckId: 2 });
    expect(card).toMatchObject({
      front: 'Front 1'
    });
  });

  it('should use default back pattern when not specified', () => {
    const card = MockCard({ cardId: 3, deckId: 2 });
    expect(card).toMatchObject({
      back: 'Back 3'
    });
  });

  it('should throw an error when no deck id is specified', () => {
    expect(() => MockCard({ cardId: 2 })).toThrow();
  });

  it('should throw an error when no id is specified', () => {
    expect(() => MockCard({ deckId: 2 })).toThrow();
  });

});
