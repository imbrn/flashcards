import Operation from './Operation';
import { Deck } from '../data';

/**
 * Fetches all decks.
 * When no decks are added, it returns an empty array.
 */
class FetchAllDecks extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute() {
    return this.data.decks.map(Deck);
  }

}

export default FetchAllDecks;
