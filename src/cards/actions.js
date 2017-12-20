import types from "./actionsTypes";

function updateCards(cards) {
  return {
    type: types.UPDATE_CARDS,
    cards
  };
}

export default {
  updateCards
};
