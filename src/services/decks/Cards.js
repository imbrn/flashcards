import Card from "./Card";

class Cards {
  static getDeckCards(deck) {
    const collection = deck.doc.ref.collection("cards");
    return new Cards(collection);
  }

  constructor(collection) {
    this._collection = collection;
  }

  getAll() {
    return this._collection.get().then(snaphot => {
      const cards = [];
      snaphot.forEach(doc => {
        cards.push(new Card(doc));
      });
      return cards;
    });
  }

  listen(
    { onAddCard = () => {}, onRemoveCard = () => {}, onUpdateCard = () => {} },
    deck
  ) {
    return this._collection.onSnapshot(snaphot => {
      snaphot.docChanges.forEach(change => {
        const card = new Card(change.doc);

        if (change.type === "added") {
          onAddCard(card.asCardModel(deck.asDeckModel()));
        } else if (change.type === "removed") {
          onRemoveCard(card.asCardModel(deck.asDeckModel()));
        } else if (change.type === "modified") {
          onUpdateCard(card.asCardModel(deck.asDeckModel()));
        }
      });
    });
  }
}

export default Cards;
