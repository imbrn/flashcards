import Operation from './Operation';
import { Card } from '../data';

/**
 * Fetches all cards matched by a specified criteria.
 * It returns an empty array if no cards are matched by the criteria.
 */
class FetchCardsByCriteria extends Operation {

  constructor(criteria) {
    super();
    this.criteria = criteria;
  }

  execute() {
    return this.data.cards.filter(this.criteria).map(Card);
  }

}

export default FetchCardsByCriteria;
