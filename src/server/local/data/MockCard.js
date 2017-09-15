import Card from './Card';

/**
 * Mocks a card using the specified data.
 * The card is created based of the properties configured in params.
 * 
 * The parameters are:
 * 
 * 
 * @param {*object} params The configuration parameters for the card creation.
 * @param {*number} deckId Id of the deck which the mock card belongs to.
 * @param {*number} cardId Id of the mock card.
 * @param {*string} frontPattern Pattern to the front of the card.
 * @param {*string} backPattern Pattern of the back of the card.
 */
function MockCard(params) {
  return Card({
    deck: deck(params),
    id: cardId(params),
    front: front(params),
    back: back(params)
  });
}

function deck(params) {
  if (params.deckId) {
    return params.deckId;
  } else {
    throw new Error('No deckId was specified');
  }
}

function cardId(params) {
  if (params.cardId) {
    return params.cardId;
  } else {
    throw new Error('No cardId was specified');
  }
}

function front(params) {
  const frontPattern = params.frontPattern ? params.frontPattern : 'Front ${id}';
  return frontPattern.replace(new RegExp('\\${id}', 'g'), params.cardId);
}

function back(params) {
  const backPattern = params.backPattern ? params.backPattern : 'Back ${id}';
  return backPattern.replace(new RegExp('\\${id}', 'g'), params.cardId);
}

export default MockCard;
