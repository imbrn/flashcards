import { CreateDeck } from '../dao';
import Storage from '../storage';

/**
 * Adds a new deck to the default storage.
 * 
 * @param {*object} params deck data
 * @return a promise which resolves to the added deck or rejects with an error.
 */
function AddDeck(params) {
  try {
    const deck = new CreateDeck(Storage).execute(params);
    return Promise.resolve(deck);
  } catch(error) {
    return Promise.reject(error);
  }
}

export default AddDeck;
