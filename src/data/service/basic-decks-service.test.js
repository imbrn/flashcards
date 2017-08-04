import { BasicDecksService, InMemoryPersistence } from './basic-decks-service';
import { List, OrderedMap } from 'immutable';
import Deck, { Card } from '../deck-record';

describe('BasicDecksService', function () {

  beforeEach(() => {
    this.service = new BasicDecksService(new InMemoryPersistence());
  });

  it('saving a new deck with success', () => {
    const addedDeck = this.service.saveDeck({ name: 'One', description: 'Deck one' });
    expect(addedDeck.get('name')).toBe('One');
    expect(addedDeck.get('description')).toBe('Deck one');
    expect(addedDeck.get('id')).toBe(1);
  });

  it('saving a changed deck with success', () => {
    let deck = this.service.saveDeck({ name: 'One', description: 'Deck one' });
    deck = this.service.saveDeck({id: 1, name: 'Two'});
    expect(deck.get('name')).toBe('Two');
    expect(deck.get('description')).toBe('Deck one');
    expect(deck.get('id')).toBe(1);
  });

  it('saving a deck after adding cards', () => {
    let deck = this.service.saveDeck({ name: 'One' });
    deck = deck.set('cards', deck.get('cards').push(Card({ front: 'A', back: 'B' })));
    deck = this.service.saveDeck(deck);
    expect(deck.get('id')).toBe(1);
    expect(deck.get('name')).toBe('One');
    expect(deck.get('cards')).toMatchObject(List([Card({ front: 'A', back: 'B' })]));
  });

  it('saving a deck with empty name should fail', () => {
    expect(() => {
      this.service.saveDeck({ name: '' });
    }).toThrow();
  });

  it('deleting a deck with success', () => {
    const deck = this.service.saveDeck({ name: 'One' });
    const deletedId = this.service.deleteDeck(deck.get('id'));
    expect(deletedId).toBe(deck.get('id'));
  });

  it('deleting a non added deck should fail', () => {
    const deck = Deck({ name: 'One' });
    expect(() => {
      this.service.deleteDeck(deck);
    }).toThrow();
  });

  it('feching all decks', () => {
    const one = this.service.saveDeck({ name: 'One' });
    const two = this.service.saveDeck({ name: 'Two' });
    const decks = this.service.fetchAllDecks();
    expect(decks.toObject()).toEqual({ "1": one, "2": two });
  });

});
