import DecksStore from './decks-store';
import Actions, { BasicDecksActions } from './decks-actions';
import { InMemoryPersistence } from './service/basic-decks-service';
import Deck, { Card } from './deck-record';
import { List } from 'immutable';

describe('DecksStore', function () {

  beforeEach(() => {
    this.actions = new BasicDecksActions(new InMemoryPersistence());
    this.actions.resetDecks();
  });

  it('adding deck with success', () => {
    expect(DecksStore.getState().size).toBe(0);
    this.actions.addDeck({ name: 'One', description: 'Deck one' });
    expect(DecksStore.getState().toObject()).toMatchObject({
      1: Deck({ id: 1, name: 'One', description: 'Deck one' })
    });
  });

  it('adding two decks with success', () => {
    this.actions.addDeck({ name: 'One', description: 'Deck one' });
    this.actions.addDeck({ name: 'Two', description: 'Deck two' });
    expect(DecksStore.getState().toObject()).toMatchObject({
      1: Deck({ id: 1, name: 'One', description: 'Deck one' }),
      2: Deck({ id: 2, name: 'Two', description: 'Deck two' }),
    })
  });

  it('adding deck without name should fail', () => {
    this.actions.addDeck({ name: '' });
    expect(DecksStore.getState().size).toBe(0);
  });

  it('updating deck with success', () => {
    this.actions.addDeck({ name: 'One', description: 'Deck one' });
    this.actions.updateDeck({ id: 1, name: 'Two' });
    expect(DecksStore.getState().toObject()).toMatchObject({
      1: Deck({ id: 1, name: 'Two', description: 'Deck one' })
    });
  });

  it('updating a deck with empty name should fail', () => {
    this.actions.addDeck({ name: 'One' });
    this.actions.updateDeck({ id: 1, name: '' });
    expect(DecksStore.getState().toObject()).toMatchObject({
      1: Deck({ id: 1, name: 'One' })
    });
  });

  it('updating deck with new cards with success', () => {
    this.actions.addDeck({ name: 'One' });
    let deck = DecksStore.getState().get(1);
    deck = deck.set('cards', deck.cards.push(Card({ front: 'A', back: 'B' })));
    this.actions.updateDeck(deck);
    expect(DecksStore.getState().toObject()).toMatchObject({
      1: Deck({ id: 1, name: 'One', cards: List([Card({ front: 'A', back: 'B' })]) })
    });
  });

  it('deleting deck with success', () => {
    this.actions.addDeck({name: 'One'});
    expect(DecksStore.getState().size).toBe(1);
    this.actions.deleteDeck(1);
    expect(DecksStore.getState().size).toBe(0);
  });

  it('deleting a non added deck should do nothing', () => {
    this.actions.addDeck({name: 'One'});
    expect(DecksStore.getState().size).toBe(1);
    this.actions.deleteDeck(2);
    expect(DecksStore.getState().size).toBe(1);
  });

});
