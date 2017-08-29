import { Record, List } from 'immutable';

/**
 * Deck model.
 */
const DeckModel = Record({
  id: 0,
  name: null,
  description: null,
  cards: List()
});

export default DeckModel;
