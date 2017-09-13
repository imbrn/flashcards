import { objectValue, trim } from './Utils';

/**
 * Create a valid deck only with the valid properties.
 * @param {*object} params deck properties values
 */
function Deck(params) {
  return {
    id: objectValue(params, 'id'),
    name: objectValue(params, 'name', null, trim),
    description: objectValue(params, 'description', null, trim),
    cards: objectValue(params, 'cards', [], cards => cards.slice())
  };
}

export default Deck;
