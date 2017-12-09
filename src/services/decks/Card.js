import { CardModel } from "../../decks";

class Card {
  constructor(cardDoc) {
    this._cardDoc = cardDoc;
  }

  asCardModel(deck) {
    return CardModel({
      ...this._cardDoc.data(),
      deck,
      id: this._cardDoc.id
    });
  }

  get id() {
    return this._cardDoc.id;
  }
}

export default Card;
