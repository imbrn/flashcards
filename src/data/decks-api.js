const DECKS_KEY = "decks";
const DECKS_NEXT_ID_KEY = "decks_next_id";

function saveDecks(decks) {
  window.localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
}

function saveNextId(nextId) {
  window.localStorage.setItem(DECKS_NEXT_ID_KEY, nextId);
}

function loadNextId() {
  const str = window.localStorage.getItem(DECKS_NEXT_ID_KEY);
  if (str) return parseInt(str, 10);
  else return 1;
}

function loadDecks() {
  const str = window.localStorage.getItem(DECKS_KEY);
  if (str) return JSON.parse(str);
  else return [];
}

/*
Decks API
*/
const DecksAPI = {

  decks: [],
  nextId: 1,

  fetchDecks() {
    return new Promise((resolve, reject) => {
      resolve(this.decks.slice());
    });
  },

  addDeck(deck) {
    return new Promise((resolve, reject) => {
      if (deck.name && deck.name.trim().length > 0) {
        const newDeck = Object.assign({}, deck, {
          id: this.nextId++,
          cards: deck.cards ? deck.cards : []
        });
        this.decks.push(newDeck);
        saveDecks(this.decks);
        saveNextId(this.nextId);
        resolve(newDeck);
      } else {
        reject("Invalid deck");
      }
    });
  },

  removeDeck(id) {
    return new Promise((resolve, reject) => {
      const index = this.decks.findIndex(deck => deck.id === id);
      if (index !== -1) {
        this.decks.splice(index, 1);
        saveDecks(this.decks);
        resolve(this.decks);
      } else {
        reject(`Not found deck with id: ${id}.`);
      }
    });
  }

};

// Initial decks load
DecksAPI.decks = loadDecks();
DecksAPI.nextId = loadNextId();

export default DecksAPI;
