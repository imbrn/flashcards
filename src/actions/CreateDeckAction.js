import { firestore } from 'firebase';

/**
 * Action to create a new deck in services.
 */
class CreateDeckAction {

  constructor(data) {
    this._data = data;
  }

  execute() {
    firestore().collection('decks').add(this._data);    
  }

}

export default CreateDeckAction;
