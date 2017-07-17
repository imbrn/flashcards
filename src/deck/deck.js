import Card from "../card/card.js";

/**
 * Represents a set of related flashcards.
 */
class Deck {

    constructor() {
        this._cards = [];
    }

    static fromJSON(json) {
        return Object.assign(new Deck, JSON.parse(json));
    }

    add(...cards) {
        this._cards.push(...cards);
    }

    removeByIndex(index) {
        this._cards.splice(index, 1);
    }

    indexOf(card) {
        for (let index = 0; index < this.length; index++) {
            if (this.getCard(index).compare(card))
                return index;
        }
        return -1;
    }

    getCard(index) {
        return this._cards[index];
    }

    get length() {
        return this._cards.length;
    }

    get size() {
        return this.length;
    }

    get json() {
        return JSON.stringify(this);
    }

}

export default Deck;
