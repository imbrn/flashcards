import Operation from './Operation';

/**
 * Searches and fetch the deck with an specified ID.
 */
class FetchDeckById extends Operation {

  constructor(id) {
    super();
    this.id = id;
  }

  execute() {
    return this.data.decks.find(deck => deck.id === this.id);
  }

}

export default FetchDeckById;
