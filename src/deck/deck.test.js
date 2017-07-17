import Card from '../card/card.js';
import Deck from './deck.js';

describe("Deck", () => {

    it("should add one card", () => {
        const card = new Card("Front", "Back");
        const deck = new Deck();
        deck.add(card);
        expect(deck.getCard(0)).toMatchObject(card);
    });

    it("should be able to add many cards", () => {
        const one = new Card("A", "B");
        const two = new Card("C", "D");
        const deck = new Deck();
        deck.add(one, two);
        expect(deck.getCard(0)).toMatchObject(one);
        expect(deck.getCard(1)).toMatchObject(two);
    });

    it("should be able to remove card by index", () => {
        const a = new Card("Front", "Back");
        const b = new Card("Another front", "Another back");
        const deck = new Deck();
        deck.add(a, b);
        deck.removeByIndex(0);
        expect(deck.getCard(0)).toMatchObject(b);
    });
    
    it("indexOf should return the index of the first found card", () => {
        const deck = new Deck();
        deck.add(new Card("A", "B"));
        deck.add(new Card("C", "D"));
        expect(deck.indexOf(new Card("C", "D"))).toBe(1);
    });

    it("indexOf should return -1 when no card is found", () => {
        const deck = new Deck();
        deck.add(new Card("A", "B"));
        expect(deck.indexOf(new Card("C", "D"))).toBe(-1);
    });

    it("serialize/deserialize with json", () => {
        const a = new Deck();
        a.add(new Card("A", "B"));
        a.add(new Card("C", "D"));
        const b = Deck.fromJSON(a.json);
        expect(b).toMatchObject(a);
    });

});
