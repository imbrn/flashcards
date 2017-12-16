import { DecksInitialLoadingState } from "./models";

const isNotLoaded = decks => {
  return decks.loadingState === DecksInitialLoadingState.NOT_LOADED;
};

const isLoading = decks => {
  return decks.loadingState === DecksInitialLoadingState.LOADING;
};

const isLoaded = decks => {
  return decks.loadingState === DecksInitialLoadingState.LOADED;
};

const isCreatingDeck = decks => {
  return decks.creatingDeck;
};

const isDeletingDeck = decks => {
  return decks.deletingDeck;
};

const isEditingDeck = decks => {
  return !!decks.editingDeck;
};

export default {
  isNotLoaded,
  isLoading,
  isLoaded,
  isCreatingDeck,
  isDeletingDeck,
  isEditingDeck
};
