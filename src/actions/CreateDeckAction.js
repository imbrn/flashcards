import Decks from '../services/decks/Decks';

/**
 * Creates a new deck.
 */
class CreateDeckAction {

  constructor(data) {
    this.data = data;
  }

  execute() {
    Decks.create(this.data);
  }

}

export default CreateDeckAction;
