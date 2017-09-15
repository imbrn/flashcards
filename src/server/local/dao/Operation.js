import { Data } from '../data';

/**
 * Abstract class for DAOs operations. It provides a util structure for implementation of
 * concrete operations.
 */
class Operation {

  constructor(storage) {
    this.storage = storage;
    this.data = Data(this.storage.data);
  }

  commit() {
    this.storage.data = Data(this.data);
    this.data = Data(this.storage.data);
  }

}

/**
 * Mock operation for tests.
 */
class MockOperation extends Operation {

  execute(params) {
    this.data = params;
    this.commit();
  }

}

export default Operation;
export {
  MockOperation
};
