/**
 * Validates the specified deck and throw an exception if it contains
 * invalid values.
 * 
 * @param {*object} deck the deck to be validated.
 */
function DeckValidation(deck) {
  if (!deck || !deck.name || deck.name.trim().length === 0) {
    throw new Error('Invalid deck data');
  }
}

export default DeckValidation;
