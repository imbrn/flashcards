import Operation from './Operation';
import FetchDeckByCriteria from './FetchDeckByCriteria';

/**
 * Searches and fetch the deck with an specified ID.
 */
class FetchDeckById extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(id) {
    return new FetchDeckByCriteria(this.storage).execute(it => it.id === id);
  }

}

export default FetchDeckById;
