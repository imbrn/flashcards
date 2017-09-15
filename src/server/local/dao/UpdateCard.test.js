import UpdateCard from './UpdateCard';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('Update success', function() {

  let storage;

  beforeAll(() => {
    storage = new MockStorage(MockData({
      decksCount: 2,
      cardsPerDeck: 4,
      cardFrontPattern: 'Front ${id}',
      cardBackPattern: 'Back ${id}'
    }));
  });

  it('should update front', () => {
    const updated = new UpdateCard(storage).execute({ id: 1, front: 'A' });
    expect(updated).toMatchObject({
      front: 'A',
      back: 'Back 1'
    });
    expect(storage.data.cards[0]).toEqual(updated);
  });

  it('should update back', () => {
    const updated = new UpdateCard(storage).execute({ id: 2, back: 'B' });
    expect(updated).toMatchObject({
      front: 'Front 2',
      back: 'B'
    });
    expect(storage.data.cards[1]).toEqual(updated);
  });

});

describe('Front is not optional', function() {

  let storage;

  beforeAll(() => {
    storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 1,
      cardFrontPattern: 'Front ${id}'
    }));
  });

  it('should keep actual front when no new front is specified', () => {
    const updated = new UpdateCard(storage).execute({ id: 1, back: 'B' });
    expect(updated).toMatchObject({ front: 'Front 1', back: 'B' });
  });

  it('should throw an error when front is undefined', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, front: undefined })).toThrow();
  });
  
  it('should throw an error when front is null', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, front: null })).toThrow();
  });

  it('should throw an error when front is empty', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, front: '' })).toThrow();
  });

  it('should throw an error when front contains only spaces', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, front: ' ' })).toThrow();
  });

});

describe('Back is not optional', function() {
  
  let storage;

  beforeAll(() => {
    storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 1,
      cardBackPattern: 'Back ${id}'
    }));
  });

  it('should keep actual back when no new back is specified', () => {
    const updated = new UpdateCard(storage).execute({ id: 1, front: 'A' });
    expect(updated).toMatchObject({ front: 'A', back: 'Back 1' });
  });

  it('should throw an error when back is undefined', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, back: undefined })).toThrow();
  });
  
  it('should throw an error when back is null', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, back: null })).toThrow();
  });

  it('should throw an error when back is empty', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, back: '' })).toThrow();
  });

  it('should throw an error when back contains only spaces', () => {
    expect(() => new UpdateCard(storage).execute({ id: 1, back: ' ' })).toThrow();
  });
  
});
