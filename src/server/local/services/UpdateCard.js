import { UpdateCard as UpdateCardDao } from '../dao';
import Storage from '../storage';

/**
 * Updates the card with the specified Id.
 * 
 * @param {*object} params card data
 * @return a promise which resolves to the udpated card or rejects with an error.
 */
function UpdateCard(params) {
  try {
    const updated = new UpdateCardDao(Storage).execute(params);
    return Promise.resolve(updated);
  } catch(error) {
    return Promise.reject(error);
  }
}

export default UpdateCard;
