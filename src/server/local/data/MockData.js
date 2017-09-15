import Data from './Data';
import MockDeck from './MockDeck';
import MockCard from './MockCard';
import { objectValue } from './Utils';

/**
 * Mocks a data object with fake values. It used the specified configuration to
 * determine the values to be generated.
 * 
 * The paremeters are:
 * decksCount: the amount of decks (default: 0);
 * cardsPerDeck: the amount of cards per deck: (default 0);
 * deckNamePattern: the pattern for decks names (default: 'Deck ${id}');
 * deckDescriptionPattern: the pattern for decks description (default: 'The deck ${id}');
 * cardFrontPattern: the pattern for cards front (default: 'Front ${id}');
 * cardBackPattern: the pattern for cards back (default: 'Back ${id}');
 * 
 * @param {*object} params The parameters to configure the data to be created.
 */
function MockData(params) {
  const decksCount = objectValue(params ,'decksCount', 0);
  const cardsPerDeck = objectValue(params, 'cardsPerDeck', 0);

  const decks = [];
  const cards = [];
  setDecksAndCards(decks, cards, decksCount, cardsPerDeck, params);

  return Data({
    decks,
    cards,
    lastDeckId: decksCount,
    lastCardId: cardsPerDeck * decksCount
  });
}

function setDecksAndCards(decks, cards, decksCount, cardsPerDeck, params) {
  let lastCardId = objectValue(params, 'lastCardId', 1);

  for (let deckId = 1; deckId <= decksCount; deckId++) {
    const deck = createDeck(deckId, params, lastCardId);    
    decks.push(deck);

    for (let i = 0; i < cardsPerDeck; i++) {
      const card = createCard(lastCardId++, deckId, params);
      cards.push(card);
    }
  }
}

function createDeck(id, params, lastCardId) {
  return MockDeck({
    id,
    namePattern: objectValue(params, 'deckNamePattern'),
    descriptionPattern: objectValue(params, 'deckDescriptionPattern'),
    firstCardId: lastCardId,
    cardsCount: objectValue(params, 'cardsPerDeck', 2)
  });
}

function createCard(cardId, deckId, params) {
  return MockCard({
    cardId,
    deckId,
    frontPattern: objectValue(params, 'cardFrontPattern'),
    backPattern: objectValue(params, 'cardBackPattern')
  });
}

export default MockData;
