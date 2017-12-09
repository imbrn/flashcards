import Cards from "./Cards";
import { DeckModel } from "../../decks";

/**
 * Proxy object to represent a Deck object data.
 * It's used to allow real Deck operations to be performed like it was in
 * a plain object.
 */
class Deck {
  constructor(deckDoc) {
    this._deckDoc = deckDoc;
  }

  getCards() {
    return Cards.getDeckCards(this);
  }

  asDeckModel() {
    return DeckModel({
      ...this._deckDoc.data(),
      id: this._deckDoc.id
    });
  }

  asDeepDeckModel() {
    const shallowDeck = this.asDeckModel();

    return this.getCards()
      .getAll()
      .then(cards => {
        return cards.map(card => card.asCardModel(shallowDeck));
      })
      .then(cardsModels => {
        return shallowDeck.set("cards", cardsModels);
      });
  }

  get doc() {
    return this._deckDoc;
  }

  get id() {
    return this._deckDoc.id;
  }
}

export default Deck;
