import Operation from './Operation';

/**
 * Fetches a card by criteria.
 * It returns the first card which matches the specified criteria.
 */
class FetchCardByCriteria extends Operation {

  constructor(criteria) {
    super();
    this.criteria = criteria;
  }

  execute() {
    return this.data.cards.find(this.criteria);
  }

}

export default FetchCardByCriteria;
