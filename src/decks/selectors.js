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

export default {
  isNotLoaded,
  isLoading,
  isLoaded,
  isCreatingDeck
};
