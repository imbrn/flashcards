import { DeleteCard as DeleteCardDao } from '../dao';
import Storage from '../storage';

/**
 * Deletes the card with the specified Id.
 * 
 * @param {*integer} id Id of the card to be deleted
 * @return a promise which resolves to the deleted card or rejects with an error.
 */
function DeleteCard(id) {
  try {
    const deleted = new DeleteCardDao(Storage).execute(id);
    return Promise.resolve(deleted);
  } catch(error) {
    return Promise.reject(error);
  }
}

export default DeleteCard;
