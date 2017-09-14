import Operation from './Operation';
import FetchCardsByCriteria from './FetchCardsByCriteria';

/**
 * Fetches all cards from an specified deck.
 * It throws an error when the specified deck not exist.
 */
class FetchDeckCards extends Operation {

  constructor(deckId) {
    super();
    this.deckId = deckId;
  }

  execute() {
    if (hasDeck(this.data, this.deckId)) {
      return new FetchCardsByCriteria(it => it.deck === this.deckId).execute();
    } else {
      throw new Error(`Not found deck with id: ${this.deckId}`);
    }
  }

}

function hasDeck(data, id) {
  return data.decks.findIndex(it => it.id === id) !== -1;
}

export default FetchDeckCards;
