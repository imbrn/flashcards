import * as reducers from "../src/reducers";
import * as Types from "../src/actionsTypes";

describe("reducers", function() {
  describe("decks", () => {
    it("returns the same values for unknown actions", () => {
      const before = [{ name: "One" }];
      const expected = [{ name: "One" }];
      expect(reducers.decks(before, { type: "UNKNOWN" })).toEqual(expected);
    });

    it("adds deck when create deck is success", () => {
      const before = [{ name: "One" }];
      const expected = [{ name: "One" }, { name: "Two" }];
      expect(
        reducers.decks(before, {
          type: Types.CREATE_DECK_SUCCESS,
          deck: { name: "Two" }
        })
      ).toEqual(expected);
    });

    it("removes deck when delete deck is success", () => {
      const before = [
        { id: 1, name: "One" },
        { id: 2, name: "Two" },
        { id: 3, name: "Three" }
      ];
      const expected = [{ id: 1, name: "One" }, { id: 3, name: "Three" }];
      expect(
        reducers.decks(before, {
          type: Types.DELETE_DECK_SUCCESS,
          deck: { id: 2, name: "Two" }
        })
      ).toEqual(expected);
    });

    it("updates deck when update deck is success", () => {
      const before = [{ id: 1, name: "One" }, { id: 2, name: "Three" }];
      const expected = [{ id: 1, name: "One" }, { id: 2, name: "Two" }];
      expect(
        reducers.decks(before, {
          type: Types.UPDATE_DECK_SUCCESS,
          deck: { id: 2, name: "Two" }
        })
      ).toEqual(expected);
    });
  });

  describe("cards", () => {
    it("returns the same value for unknown actions", () => {
      const before = [{ id: 1, front: "One", back: "Um" }];
      expect(
        reducers.cards(before, {
          type: "UNKNOW_ACTION"
        })
      ).toEqual(before);
    });

    it("adds card when create card is performed", () => {
      const before = [{ id: 1, front: "One", back: "Um" }];
      expect(
        reducers.cards(before, {
          type: Types.CREATE_CARD_SUCCESS,
          card: { id: 2, front: "Two", back: "Dois" }
        })
      ).toEqual([
        { id: 1, front: "One", back: "Um" },
        { id: 2, front: "Two", back: "Dois" }
      ]);
    });

    it("removes card when delete card is performed", () => {
      const before = [
        { id: 1, front: "One", back: "Um" },
        { id: 2, front: "Two", back: "Dois" }
      ];
      expect(
        reducers.cards(before, {
          type: Types.DELETE_CARD_SUCCESS,
          card: { id: 1, front: "One", back: "Um" }
        })
      ).toEqual([{ id: 2, front: "Two", back: "Dois" }]);
    });

    it("updates card when update card is performed", () => {
      const before = [{ id: 1, front: "One", back: "Dois" }];
      expect(
        reducers.cards(before, {
          type: Types.UPDATE_CARD_SUCCESS,
          card: { id: 1, front: "One", back: "Um" }
        })
      ).toEqual([{ id: 1, front: "One", back: "Um" }]);
    });
  });
});
