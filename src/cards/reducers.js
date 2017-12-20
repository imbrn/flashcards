import types from "./actionsTypes";
import { OrderedMap } from "immutable";
import { CardItem } from "./models";

function cards(state = OrderedMap(), action) {
  switch (action.type) {
    case types.UPDATE_CARDS:
      return OrderedMap(
        action.cards.map(card => [card.id, new CardItem(card)])
      );
    default:
      return state;
  }
}

export default cards;
