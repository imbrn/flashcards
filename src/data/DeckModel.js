import { Record, List } from 'immutable';

/**
 * Deck model.
 */
class DeckModel extends Record({
  id: 0,
  name: null,
  description: null,
  cards: List()
}) {

  isValid() {
    return this.validateName();
  }

  validateName() {
    return this.name !== null && this.name.trim().length > 0;
  }

}

export default DeckModel;
