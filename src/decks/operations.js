import actions from "./actions";
import services from "../services";

const updateDecks = actions.updateDecks;

const createDeck = data => {
  return () => {
    return services.decks.create(data);
  };
};

const deleteDeck = deckId => {
  return () => {
    return services.decks.remove(deckId);
  };
};

const updateDeck = (deckId, data) => {
  return () => {
    return services.decks.update(deckId, data);
  };
};

export default {
  updateDecks,
  createDeck,
  deleteDeck,
  updateDeck
};
