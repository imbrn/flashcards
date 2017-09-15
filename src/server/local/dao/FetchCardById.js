import Operation from './Operation';
import FetchCardByCriteria from './FetchCardByCriteria';

/**
 * Fetches a card by ID. If no deck is found then returns undefined.
 */
class FetchCardById extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(id) {
    return new FetchCardByCriteria(this.storage).execute(it => it.id === id);
  }

}

export default FetchCardById;
