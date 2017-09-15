import Operation from './Operation';
import { Deck } from '../data';
import { DeckValidation } from '../validation';

/**
 * Operation for creating deck.
 */
class CreateDeck extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(params) {
    const deck = buildDeck(params, this.data);
    DeckValidation(deck);
    this.data.decks.push(deck);
    this.commit();
    return Deck(deck);
  }

}

function buildDeck(params, data) {
  return Deck(Object.assign({}, params, {
    id: ++data.lastDeckId,
    cards: []
  }));
}

export default CreateDeck;
