import UpdateDeck from './UpdateDeck';
import { MockStorage } from '../storage';
import { MockData } from '../data';

describe('UpdateDeck', function() {

  it('should update deck with success', () => {
    const storage = new MockStorage(MockData({
      decksCount: 1,
      cardsPerDeck: 2,
      deckNamePattern: 'Wrong deck ${id}'
    }));

    const updated = new UpdateDeck(storage).execute({
      id: 1,
      name: 'Right deck 1'
    });

    expect(updated).toEqual(storage.data.decks[0]);
    expect(updated).toMatchObject({ name: 'Right deck 1' });
  });

  it('should throw when updating non added deck', () => {
    const storage = new MockStorage(MockData());
    expect(() => UpdateDeck(storage).execute({ id : 1, name: 'Two' })).toThrow();
  });

  it('should not update name when it is not specified', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, deckNamePattern: 'Deck ${id}' }));
    const deck = new UpdateDeck(storage).execute({ id: 1, description: 'New description' });
    expect(deck).toMatchObject({
      name: 'Deck 1',
      description: 'New description'
    });
  });

  it('should not update description when it is not specified', () => {
    const storage = new MockStorage(MockData({ decksCount: 1, deckDescriptionPattern: 'Description ${id}' }));
    const deck = new UpdateDeck(storage).execute({ id: 1, name: 'New name' });
    expect(deck).toMatchObject({
      name: 'New name',
      description: 'Description 1'
    });
  });
  
});

describe('Name is not null', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({
      decksCount: 1,
      deckNamePattern: 'Deck ${id}'
    }));
  });

  it('should throw an error when name is null', () => {
    expect(() => new UpdateDeck(this.storage).execute({ name: null })).toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ name: 'Deck 1' });
  });

  it('should throw an error when name is empty', () => {
    expect(() => new UpdateDeck(this.storage).execute({ name: '' })).toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ name: 'Deck 1' });
  });

  it('should throw an error when name cotains only spaces', () => {
    expect(() => new UpdateDeck(this.storage).execute({ name: '  ' })).toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ name: 'Deck 1' });
  });

});

describe('Description can be null', function() {

  beforeAll(() => {
    this.storage = new MockStorage(MockData({ decksCount: 1 }));
  });

  it('should update with success when description is null', () => {
    expect(() => new UpdateDeck(this.storage).execute({ id: 1, description: null })).not.toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ description: null });
  });

  it('should update with success when description is undefined', () => {
    expect(() => new UpdateDeck(this.storage).execute({ id: 1, description: undefined })).not.toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ description: undefined });
  });

  it('should update with success when description is empty', () => {
    expect(() => new UpdateDeck(this.storage).execute({ id: 1, description: '' })).not.toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ description: '' });
  });

  it('should update with success when description contains only spaces', () => {
    expect(() => new UpdateDeck(this.storage).execute({ id: 1, description: '  ' })).not.toThrow();
    expect(this.storage.data.decks[0]).toMatchObject({ description: '' });
  });

});
