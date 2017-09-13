import Operation from './Operation';
import { Card } from '../data';
import { CardValidation } from '../validation';

/**
 * Creates a new card.
 */
class CreateCard extends Operation {

  constructor(params) {
    super();
    this.params = params;
  }

  execute() {
    const deck = fetchDeck(this.data, this.params.deck);
    const card = buildCard(this.data, this.params);
    CardValidation(card);
    deck.cards.push(card.id);
    this.data.cards.push(card);
    this.commit();
    return card;
  }

}

function fetchDeck(data, id) {
  const index = data.decks.findIndex(it => it.id === id);
  if (index !== -1) {
    return data.decks[index];
  } else {
    throw new Error(`Not found deck with id: ${id}`);
  }
}

function buildCard(data, params) {
  const obj = Object.assign({}, params, {
    id: ++data.lastCardId
  });
  return Card(obj);
}

export default CreateCard;
