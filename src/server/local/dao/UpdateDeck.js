import Operation from './Operation';
import { Deck } from '../data';
import { DeckValidation } from '../validation';

/**
 * Updates the deck with the specified id.
 */
class UpdateDeck extends Operation {

  constructor(params) {
    super();
    this.params = params;
  }

  execute() {
    const index = this.data.decks.findIndex(it => it.id === this.params.id);
    if (index !== -1) {
      return this.doExecute(index);
    } else {
      throw new Error(`Not found deck with id: ${this.params.id}`);
    }
  }

  doExecute(index) {
    const deck = buildDeck(this.data.decks[index], this.params);
    DeckValidation(deck);
    this.data.decks[index] = deck;
    this.commit();
    return deck;
  }

}

function buildDeck(oldDeck, params) {
  const obj = Object.assign({}, oldDeck, params, {
    id: oldDeck.id,
    cards: oldDeck.cards
  });
  return Deck(obj);
}

export default UpdateDeck;
