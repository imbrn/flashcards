import Operation from './Operation';

/**
 * Fetches all decks which apply the specified criteria. If no decks are found, returns an
 * empty array.
 */
class FetchDecksByCriteria extends Operation {

  constructor(criteria) {
    super();
    this.criteria = criteria;
  }

  execute() {
    return this.data.decks.filter(this.criteria);
  }

}

export default FetchDecksByCriteria;
