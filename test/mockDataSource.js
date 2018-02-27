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
    this.failure = null;
  },

  addDeck(deckData) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const deck = {
          ...deckData,
          id: ++this.lastId,
          creationTime: ++this.lastCreationTime,
          updateTime: ++this.lastUpdateTime
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

  createCard(cardData) {
    return new Promise((resolve, reject) => {
      if (!this.failure) {
        const card = {
          id: ++this.lastCardId,
          creationTime: ++this.lastCardCreationTime,
          updateTime: ++this.lastCardUpdateTime,
          ...cardData
        };
        this.cards.push(card);
        this.lastCreatedCard = card;
        resolve(card);
      } else {
        reject(this.failure);
      }
    });
  }
};

export default mockDataSource;
