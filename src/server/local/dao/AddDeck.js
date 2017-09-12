import Operation from './Operation';
import { Deck } from '../data';

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
    validate(deck);
    this.data.decks.push(deck);
    this.commit();
    return deck;
  }

}

function buildDeck(params, data) {
  return Deck(Object.assign({}, params, { id: ++data.lastDeckId, cards: [] }));
}

function validate(deck) {
  if (!deck || !deck.name || deck.name.trim().length === 0) {
    throw new Error('Invalid deck');
  }
}

export default AddDeck;
