import Card from "./card.js";

describe("Card", () => {

    it("clone should return exactly the same", () => {
        const a = new Card("Front", "Back");
        const b = a.clone();
        expect(b).toMatchObject(a);
    });

    it("mutate should create a modified copy of Card", () => {
        const a = new Card("Front", "Back");
        const expected = new Card("Other front", "Other back");
        expect(a.mutate({
            "front": expected.front,
            "back": expected.back
        })).toMatchObject(expected);
    });

    it("compare two cards with same content should return true", () => {
        const a = new Card("A", "B");
        const b = new Card("A", "B");
        expect(a.compare(b)).toBeTruthy();
    });

    it("compare two cards with different contents should return false", () => {
        const a = new Card("A", "B");
        const b = new Card("A", "C");
        expect(a.compare(b)).toBeFalsy();
    });

})
