import Operation from './Operation';
import { Deck } from '../data';

/**
 * Fetches all decks which apply the specified criteria. If no decks are found, returns an
 * empty array.
 */
class FetchDecksByCriteria extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(criteria) {
    return this.data.decks.filter(criteria).map(Deck);
  }

}

export default FetchDecksByCriteria;
