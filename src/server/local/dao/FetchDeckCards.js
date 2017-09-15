import Operation from './Operation';
import FetchCardsByCriteria from './FetchCardsByCriteria';

/**
 * Fetches all cards from an specified deck.
 * It throws an error when the specified deck not exist.
 */
class FetchDeckCards extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(deckId) {
    if (hasDeck(this.data, deckId)) {
      return new FetchCardsByCriteria(this.storage).execute(it => it.deck === deckId);
    } else {
      throw new Error(`Not found deck with id: ${deckId}`);
    }
  }

}

function hasDeck(data, id) {
  return data.decks.findIndex(it => it.id === id) !== -1;
}

export default FetchDeckCards;
