import { OrderedMap } from "immutable";
import types from "./actionsTypes";
import { DeckItem } from "./models";

function decks(state = OrderedMap(), action) {
  switch (action.type) {
    case types.UPDATE_DECKS:
      return OrderedMap(
        action.decks.map(deck => [deck.id, new DeckItem(deck)])
      );
    default:
      return state;
  }
}

export default decks;
