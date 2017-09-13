import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import FetchCardById from './FetchCardById';
import Storage from '../storage';

describe('CreateCard', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should add card with success', () => {
    const deck = new CreateDeck({ name: 'One' }).execute();
    const cardOne = new CreateCard({ front: 'A', back: 'B', deck: deck.id }).execute();
    const cardTwo = new CreateCard({ front: 'C', back: 'D', deck: deck.id }).execute();
    expect(cardOne).toMatchObject({ front: 'A', back: 'B' });
    expect(cardTwo).toMatchObject({ front: 'C', back: 'D' });
    expect(new FetchCardById(cardOne.id).execute()).toEqual(cardOne);
    expect(new FetchCardById(cardTwo.id).execute()).toEqual(cardTwo);
  });

  it('should throw an error when adding card with invalid front', () => {
    const deck = new CreateDeck({ name: 'One' });
    expect(() => new CreateCard({ deck: deck.id, back: 'B' }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: null, back: 'B' }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: '', back: 'B' }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: ' ', back: 'B' }).execute()).toThrow();
  });

  it('should throw an error when adding card with invalid back', () => {
    const deck = new CreateDeck({ name: 'One' });
    expect(() => new CreateCard({ deck: deck.id, front: 'A' }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: 'A', back: null }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: 'A', back: '' }).execute()).toThrow();
    expect(() => new CreateCard({ deck: deck.id, front: 'A', back: ' ' }).execute()).toThrow();
  });

  it('should throw an error when adding card into a non added deck', () => {
    expect(() => new CreateCard({ deck: 1 }).execute()).toThrow();
  });

  it('should throw an error when adding card without deck', () => {
    expect(() => new CreateCard({ front: 'A', back: 'B' }).execute()).toThrow();
  });

});
