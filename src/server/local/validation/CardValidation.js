/**
 * Validates the specified card and throws an error if it's invalid.
 * 
 * @param {*Card} card object to be validated.
 */
function CardValidation(card) {
  if (!card || !validateFront(card.front) || !validateBack(card.back)) {
    throw new Error('Invalid card');
  }
}

function validateFront(front) {
  return front && front.trim().length > 0;
}

function validateBack(back) {
  return back && back.trim().length > 0;
}

export default CardValidation;
