import Operation from './Operation';
import { Card } from '../data';

/**
 * Fetches all cards matched by a specified criteria.
 * It returns an empty array if no cards are matched by the criteria.
 */
class FetchCardsByCriteria extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(criteria) {
    return this.data.cards.filter(criteria).map(Card);
  }

}

export default FetchCardsByCriteria;
