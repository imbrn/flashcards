import Operation from './Operation';
import { Card } from '../data';
import { CardValidation } from '../validation';

/**
 * Updates the card with the specified Id.
 */
class UpdateCard extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(params) {
    const index = this.data.cards.findIndex(it => it.id === params.id);
    if (index !== -1) {
      return this.doExecute(params, index);
    } else {
      throw new Error(`Not found card with id: ${params.id}`);
    }
  }

  doExecute(params, index) {
    const card = buildCard(this.data.cards[index], params);
    CardValidation(card);
    this.data.cards[index] = card;
    this.commit();
    return card;
  }

}

function buildCard(old, params) {
  const obj = Object.assign({}, old, params, {
    id: old.id,
    deck: old.deck
  });
  return Card(obj);
}

export default UpdateCard;
