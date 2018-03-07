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
});
