import Operation from './Operation';
import { Deck } from '../data';
import { DeckValidation } from '../validation';

/**
 * Updates the deck with the specified id.
 */
class UpdateDeck extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(params) {
    const index = this.data.decks.findIndex(it => it.id === params.id);
    if (index !== -1) {
      return this.doExecute(index, params);
    } else {
      throw new Error(`Not found deck with id: ${params.id}`);
    }
  }

  doExecute(index, params) {
    const deck = buildDeck(this.data.decks[index], params);
    DeckValidation(deck);
    this.data.decks[index] = deck;
    this.commit();
    return Deck(deck);
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
