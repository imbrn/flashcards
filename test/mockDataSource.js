const mockDataSource = {
  reset() {
    this.decks = [];
    this.cards = [];
    this.lastDeckId = 0;
    this.lastCardId = 0;
    this.lastDeckCreationTime = 0;
    this.lastCardCreationTime = 0;
    this.lastDeckUpdateTime = 0;
    this.lastCardUpdateTime = 0;
    this.lastAddedDeck = null;
    this.lastUpdatedDeck = null;
    this.lastDeletedDeck = null;
    this.lastCreatedCard = null;
    this.lastUpdatedCard = null;
    this.failure = null;
  },

  createDeck(deckData) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const deck = {
          ...deckData,
          id: ++this.lastDeckId,
          creationTime: ++this.lastDeckCreationTime,
          updateTime: ++this.lastDeckUpdateTime
        };
        this.decks.push(deck);
        this.lastAddedDeck = deck;
        resolve(deck);
      } else {
        reject(this.failure);
      }
    });
  },

  updateDeck(deckDataToUpdate) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const { id, ...rest } = deckDataToUpdate;
        const index = this.decks.findIndex(it => it.id === id);
        const updatedDeck = {
          ...this.decks[index],
          updateTime: ++this.lastDeckUpdateTime,
          ...rest
        };
        this.decks[index] = updatedDeck;
        this.lastUpdatedDeck = updatedDeck;
        resolve(updatedDeck);
      } else {
        reject(this.failure);
      }
    });
  },

  deleteDeck(deckId) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const index = this.decks.findIndex(it => it.id === deckId);
        const deletedDeck = this.decks[index];
        this.decks.splice(index, 1);
        this.lastDeletedDeck = deletedDeck;
        resolve(deletedDeck);
      } else {
        reject(this.failure);
      }
    });
  },

  createCard(deckId, cardData) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const card = {
          ...cardData,
          id: ++this.lastCardId,
          deckId,
          creationTime: ++this.lastCardCreationTime,
          updateTime: ++this.lastCardUpdateTime
        };
        this.cards.push(card);
        this.lastCreatedCard = card;
        resolve(card);
      } else {
        reject(this.failure);
      }
    });
  },

  updateCard(cardId, cardDataToUpdate) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const index = this.cards.findIndex(it => it.id === cardId);
        const card = {
          ...this.cards[index],
          ...cardDataToUpdate,
          id: cardId,
          updateTime: ++this.lastCardUpdateTime
        };
        this.cards[index] = card;
        this.lastUpdatedCard = card;
        resolve(card);
      } else {
        reject(this.failure);
      }
    });
  }
};

mockDataSource.reset();

export default mockDataSource;
