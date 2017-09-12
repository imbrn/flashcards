import Card from './Card';

describe('Card', function() {

  it('fields are always created', () => {
    const card = Card();
    expect(card).toHaveProperty('id');
    expect(card).toHaveProperty('front');
    expect(card).toHaveProperty('back');
    expect(card).toHaveProperty('deck');
  });

  it('creating new card', () => {
    const card = Card({
      id: 5,
      front: 'A',
      back: 'B',
      deck: 3
    });
    expect(card).toEqual({
      id: 5,
      front: 'A',
      back: 'B',
      deck: 3
    });
  });

  it('invalid fields are ignored', () => {
    const card = Card({
      invalidOne: 1,
      invalidTwo: 2
    });
    expect(card).toEqual({
      id: null,
      front: null,
      back: null,
      deck: null
    });
  });

});
