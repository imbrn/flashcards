import Operation from './Operation';

/**
 * Fetches the first deck which applies the criteria. If no deck applies, returns
 * undefined.
 */
class FetchDeckByCriteria extends Operation {

  constructor(criteria) {
    super();
    this.criteria = criteria;
  }

  execute() {
    return this.data.decks.find(this.criteria);
  }

}

export default FetchDeckByCriteria;
