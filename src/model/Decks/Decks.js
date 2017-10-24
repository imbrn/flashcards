import { auth, firestore } from 'firebase';

class Decks {

  constructor() {
    this._decksRef = firestore().collection('users')
      .doc(auth().currentUser.uid)
      .collection('decks');
  }

  static getInstance() {
    if (!Decks._instance)
      Decks._instance = new Decks();
    return Decks._instance;
  }

  operation(it) {
    return new OperationExecutorBuilder(this).operation(it);
  }

  get decksRef() {
    return this._decksRef;
  }

}

class OperationExecutor {

  constructor(builder) {
    this._decks = builder._decks;
    this._operation = builder._operation;
    this._params = builder._params;
  }

  execute() {
    if (this._operation) {
      const params = [this._decks].concat(this._params);
      return this._operation(...params);
    } else {
      throw new Error('Invalid operation');
    }
  }

}

class OperationExecutorBuilder {

  constructor(decks) {
    this._decks = decks;
  }

  operation(it) {
    this._operation = it;
    return this;
  }

  withParams(...params) {
    this._params = params;
    return this;
  }

  done() {
    return new OperationExecutor(this);
  }

}

export default () => {
  return Decks.getInstance();
};
