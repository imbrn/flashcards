import Operation from './Operation';
import { Deck } from '../data';
import { DeckValidation } from '../validation';

/**
 * Operation for adding deck.
 */
class AddDeck extends Operation {

  constructor(params) {
    super();
    this.params = params;
  }

  execute() {
    const deck = buildDeck(this.params, this.data);
    DeckValidation(deck);
    this.data.decks.push(deck);
    this.commit();
    return deck;
  }

}

function buildDeck(params, data) {
  return Deck(Object.assign({}, params, {
    id: ++data.lastDeckId,
    cards: []
  }));
}

export default AddDeck;
