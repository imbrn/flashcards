import { objectValue } from './Utils';
import Deck from './Deck';
import Card from './Card';

/**
 * Create a data structure only with valid properties.
 * @param {*object} params data properties values
 */
function Data(params) {
  return {
    decks: objectValue(params, 'decks', [], decks => decks.map(it => Deck(it))),
    cards: objectValue(params, 'cards', [], cards => cards.map(it => Card(it))),
    lastDeckId: objectValue(params, 'lastDeckId', 0),
    lastCardId: objectValue(params, 'lastCardId', 0)
  };
}

export default Data;
