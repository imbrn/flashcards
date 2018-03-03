import * as Types from "../src/actionsTypes";

import {
  setDataSource,
  createDeck,
  updateDeck,
  deleteDeck,
  createCard,
  updateCard
} from "../src/actions";
import mockDataSource from "./mockDataSource";
import reduxThunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([reduxThunk]);

describe("actions", function() {
  let store;

  beforeAll(() => {
    setDataSource(mockDataSource);
  });

  beforeEach(() => {
    mockDataSource.reset();
    store = mockStore({
      decks: [],
      cards: []
    });
  });

  describe("createDeck", () => {
    let deckData;

    beforeAll(() => {
      deckData = {
        nam: "Deck one",
        description: "The deck one",
        front: "en",
        back: "pt"
      };
    });

    it("dispatch request the deck creation", () => {
      return store.dispatch(createDeck(deckData)).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: Types.REQUEST_CREATE_DECK,
          deckData
        });
      });
    });

    it("dispatch success when deck is added", () => {
      return store.dispatch(createDeck(deckData)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_CREATE_DECK, deckData },
          {
            type: Types.CREATE_DECK_SUCCESS,
            deck: mockDataSource.lastAddedDeck
          }
        ]);
      });
    });

    it("dispatch failure when deck is not added", () => {
      mockDataSource.failure = "Ocurred an error";
      return store.dispatch(createDeck(deckData)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_CREATE_DECK, deckData },
          {
            type: Types.CREATE_DECK_FAILURE,
            deckData,
            error: mockDataSource.failure
          }
        ]);
      });
    });
  });

  describe("updateDeck", () => {
    let currentDeckData;
    let deckDataToUpdate;

    beforeAll(() => {
      currentDeckData = {
        name: "Deck one",
        description: "The deck one",
        front: "en",
        back: "pt"
      };

      deckDataToUpdate = {
        name: "Deck two",
        description: "The deck two"
      };
    });

    beforeEach(() => {
      mockDataSource.createDeck(currentDeckData);
    });

    it("dispatch request update deck", () => {
      return store.dispatch(updateDeck(deckDataToUpdate)).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: Types.REQUEST_UPDATE_DECK,
          deckDataToUpdate
        });
      });
    });

    it("dispatch success when update deck", () => {
      return store.dispatch(updateDeck(deckDataToUpdate)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_UPDATE_DECK, deckDataToUpdate },
          {
            type: Types.UPDATE_DECK_SUCCESS,
            deck: mockDataSource.lastUpdatedDeck
          }
        ]);
      });
    });

    it("dispatch failure when deck is not updated", () => {
      mockDataSource.failure = "Ocurred an error";
      return store.dispatch(updateDeck(deckDataToUpdate)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_UPDATE_DECK, deckDataToUpdate },
          {
            type: Types.UPDATE_DECK_FAILURE,
            deckDataToUpdate,
            error: mockDataSource.failure
          }
        ]);
      });
    });
  });

  describe("deleteDeck", () => {
    let deckToDelete;

    beforeAll(() => {
      deckToDelete = {
        id: 1,
        name: "One",
        description: "Deck one",
        front: "en",
        back: "pt"
      };
    });

    beforeEach(() => {
      mockDataSource.decks.push(deckToDelete);
    });

    it("dispatch request delete deck", () => {
      return store.dispatch(deleteDeck(deckToDelete.id)).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: Types.REQUEST_DELETE_DECK,
          id: deckToDelete.id
        });
      });
    });

    it("dispatch success when deck is deleted", () => {
      return store.dispatch(deleteDeck(deckToDelete.id)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_DELETE_DECK, id: deckToDelete.id },
          {
            type: Types.DELETE_DECK_SUCCESS,
            deck: mockDataSource.lastDeletedDeck
          }
        ]);
      });
    });

    it("dispatch failure when deck is not deleted", () => {
      mockDataSource.failure = "Ocurred an error";
      return store.dispatch(deleteDeck(deckToDelete.id)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_DELETE_DECK, id: deckToDelete.id },
          {
            type: Types.DELETE_DECK_FAILURE,
            id: deckToDelete.id,
            error: mockDataSource.failure
          }
        ]);
      });
    });
  });

  describe("createCard", () => {
    let deck;
    let cardData;

    beforeAll(() => {
      cardData = {
        front: "One",
        back: "Two"
      };
    });

    beforeEach(() => {
      mockDataSource
        .createDeck({
          name: "Deck A"
        })
        .then(addedDeck => {
          deck = addedDeck;
        });
    });

    it("dispatch request create card", () => {
      return store.dispatch(createCard(deck.id, cardData)).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: Types.REQUEST_CREATE_CARD,
          deckId: deck.id,
          cardData
        });
      });
    });

    it("dispatch success when card is created", () => {
      return store.dispatch(createCard(deck.id, cardData)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_CREATE_CARD, cardData, deckId: deck.id },
          {
            type: Types.CREATE_CARD_SUCCESS,
            card: mockDataSource.lastCreatedCard
          }
        ]);
      });
    });

    it("dispatch failure when card is not created", () => {
      mockDataSource.failure = "Error";
      return store.dispatch(createCard(deck.id, cardData)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_CREATE_CARD, cardData, deckId: deck.id },
          {
            type: Types.CREATE_CARD_FAILURE,
            cardData,
            deckId: deck.id,
            error: mockDataSource.failure
          }
        ]);
      });
    });
  });

  describe("updateCard", () => {
    let card;
    let cardDataToUpdate;

    beforeAll(() => {
      cardDataToUpdate = {
        front: "Two",
        back: "Dois"
      };
    });

    beforeEach(() => {
      mockDataSource
        .createDeck({
          name: "Deck"
        })
        .then(deck => {
          mockDataSource
            .createCard(deck.id, { front: "One", back: "Two" })
            .then(it => (card = it));
        });
    });

    it("dispatch request update card", () => {
      return store.dispatch(updateCard(card.id, cardDataToUpdate)).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: Types.REQUEST_UPDATE_CARD,
          id: card.id,
          cardDataToUpdate
        });
      });
    });

    it("dispatch success when card is updated", () => {
      return store.dispatch(updateCard(card.id, cardDataToUpdate)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_UPDATE_CARD, id: card.id, cardDataToUpdate },
          {
            type: Types.UPDATE_CARD_SUCCESS,
            card: mockDataSource.lastUpdatedCard
          }
        ]);
      });
    });

    it("dispatch failure when card is not updated", () => {
      mockDataSource.failure = "An error";
      return store.dispatch(updateCard(card.id, cardDataToUpdate)).then(() => {
        expect(store.getActions()).toEqual([
          { type: Types.REQUEST_UPDATE_CARD, id: card.id, cardDataToUpdate },
          {
            type: Types.UPDATE_CARD_FAILURE,
            id: card.id,
            cardDataToUpdate,
            error: mockDataSource.failure
          }
        ]);
      });
    });
  });
});
