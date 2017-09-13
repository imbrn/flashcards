import Operation from './Operation';
import FetchCardByCriteria from './FetchCardByCriteria';

/**
 * Fetches a card by ID. If no deck is found then returns undefined.
 */
class FetchCardById extends Operation {

  constructor(id) {
    super();
    this.id = id;
  }

  execute() {
    return new FetchCardByCriteria(it => it.id === this.id).execute();
  }

}

export default FetchCardById;
