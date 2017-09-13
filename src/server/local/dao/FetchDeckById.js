import Operation from './Operation';
import FetchDeckByCriteria from './FetchDeckByCriteria';

/**
 * Searches and fetch the deck with an specified ID.
 */
class FetchDeckById extends Operation {

  constructor(id) {
    super();
    this.id = id;
  }

  execute() {
    return new FetchDeckByCriteria(it => it.id === this.id).execute();
  }

}

export default FetchDeckById;
