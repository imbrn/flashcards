import Card from "./Card";
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
    return this._deckDoc.ref.collection("cards").get().then(this._convertToCards);
  }

  _convertToCards(snapshot) {
    const cards = [];
    snapshot.forEach(doc => {
      cards.push(new Card(doc));
    });
    return cards;
  }

  asDeckModel() {
    return DeckModel({
      ...this._deckDoc.data(),
      id: this._deckDoc.id,
    });
  }

  asDeepDeckModel() {
    const shallowDeck = this.asDeckModel();

    return this.getCards().then(cards => {
      return cards.map(card => card.asCardModel(shallowDeck));
    }).then(cardsModels => {
      return shallowDeck.set("cards", cardsModels);
    });
  }

}

export default Deck;
