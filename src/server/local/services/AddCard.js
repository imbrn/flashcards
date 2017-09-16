import { CreateCard as CreateCardDao } from '../dao';
import Storage from '../storage';

/**
 * Adds a new card into the default storage.
 * 
 * @param {*object} params card data
 * @return a promise which resolves to the added card or rejects with an error.
 */
function AddCard(params) {
  try {
    const card = new CreateCardDao(Storage).execute(params);
    return Promise.resolve(card);
  } catch(error) {
    return Promise.reject(error);
  }
}

export default AddCard;
