import Operation from './Operation';

/**
 * Deletes a card by Id.
 * If the specified Id does not match any card, an error is thrown.
 */
class DeleteCard extends Operation {

  constructor(storage) {
    super(storage);
  }

  execute(id) {
    const index = this.data.cards.findIndex(it => it.id === id);
    if (index !== -1) {
      return this.doExecute(index);
    } else {
      throw new Error(`Not found card with id: ${id}`);
    }
  }

  doExecute(index) {
    const card = this.data.cards.splice(index, 1)[0];
    removeFromParent(card, this.data);
    this.commit();
    return card;
  }

}

function removeFromParent(card, data) {
  const deck = data.decks.find(it => it.id === card.deck);
  const index = deck.cards.findIndex(it => it.id === card.id);
  deck.cards.splice(index, 1);
}

export default DeleteCard;
