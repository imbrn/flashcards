import Operation from './Operation';
import { Card } from '../data';

/**
 * Fetches a card by criteria.
 * It returns the first card which matches the specified criteria.
 */
class FetchCardByCriteria extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(criteria) {
    const card = this.data.cards.find(criteria);
    if (card) {
      return Card(card);
    }
  }

}

export default FetchCardByCriteria;
