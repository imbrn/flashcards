import Deck from './Deck';

/**
 * Mocks a deck using the specified configuration.
 * 
 * The configuration contains the following values:
 * id: number -> the deck id;
 * firstCardId: number -> the Id of the first deck's card;
 * cardsCount: number -> the count of cards to be faked in the deck;
 * namePattern: string -> the pattern of the deck name; ${id} will be replaced by the deck id;
 * descriptionPattern: string -> the pattern of the deck description; ${id} will be replace by the deck id;
 * 
 * @param {*object} params object containing the configuration for the deck creation.
 */
function MockDeck(params) {
  return Deck({
    id: params.id,
    name: name(params),
    description: description(params),
    cards: cards(params)
  });
}

function cards(params) {
  const cards = [];
  const start = params.firstCardId ? params.firstCardId : 1;
  const end = start + (params.cardsCount ? params.cardsCount : 2);
  for (let cardId = start; cardId < end; cardId++) {
    cards.push(cardId);
  }
  return cards;
}

function name(params) {
  const namePattern = params.namePattern ? params.namePattern : 'Deck ${id}';
  return pattern(namePattern, params.id);
}

function description(params) {
  const descriptionPattern = params.descriptionPattern ? params.descriptionPattern : 'The deck ${id}';
  return pattern(descriptionPattern, params.id);
}

function pattern(pattern, id) {
  return pattern.replace(new RegExp('\\${id}', 'g'), id);
}

export default MockDeck;
