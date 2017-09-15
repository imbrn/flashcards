import Operation from './Operation';
import { Deck } from '../data';

/**
 * Fetches the first deck which applies the criteria. If no deck applies, returns
 * undefined.
 */
class FetchDeckByCriteria extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(criteria) {
    const deck = this.data.decks.find(criteria);
    if (deck) {
      return Deck(deck);
    }
  }

}

export default FetchDeckByCriteria;
