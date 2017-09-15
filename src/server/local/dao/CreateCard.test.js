import CreateCard from './CreateCard';
import { MockStorage } from '../storage/Storage';
import { MockData } from '../data';

describe('CreateCard', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({ decksCount: 1, cardsPerDeck: 0 }));
  });

  it('should add card with success', () => {
    const cardOne = new CreateCard(this.storage).execute({ front: 'A', back: 'B', deck: 1 });
    const cardTwo = new CreateCard(this.storage).execute({ front: 'C', back: 'D', deck: 1 });
    expect(cardOne).toMatchObject({ front: 'A', back: 'B' });
    expect(cardTwo).toMatchObject({ front: 'C', back: 'D' });
    expect(this.storage.data.cards[0]).toEqual(cardOne);
    expect(this.storage.data.cards[1]).toEqual(cardTwo);
  });

  it('should throw an error when adding card into a non added deck', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 500, front: 'A', back: 'B' })).toThrow();
  });

  it('should throw an error when adding card without deck', () => {
    expect(() => new CreateCard(this.storage).execute({ front: 'A', back: 'B' })).toThrow();
  });

});

describe('Front is not optional', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 1
    }));
  });

  it('should throw an error when front is undefined', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, back: 'B' })).toThrow();
  });

  it('should throw an error when front is null', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: null, back: 'B' })).toThrow();
  });

  it('should throw an error when front is empty', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: '', back: 'B' })).toThrow();
  });

  it('should throw an error when front contains only spaces', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: ' ', back: 'B' })).toThrow();
  });

});

describe('Back is not optional', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 1
    }));
  });

  it('should throw an error when back is undefined', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: 'A' })).toThrow();
  });

  it('should throw an error when back is null', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: 'A', back: null })).toThrow();
  });

  it('should throw an error when back is empty', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: 'A', back: '' })).toThrow();
  });

  it('should throw an error when back contains only spaces', () => {
    expect(() => new CreateCard(this.storage).execute({ deck: 1, front: 'A', back: ' ' })).toThrow();
  });

});
