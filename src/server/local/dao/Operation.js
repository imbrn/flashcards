import { Data } from '../data';
import Storage from '../storage';

/**
 * Abstract class for DAOs operations. It provides a util structure for implementation of
 * concrete operations.
 */
class Operation {

  constructor() {
    this.data = Data(Storage.data);
  }

  commit() {
    Storage.data = Data(this.data);
    this.data = Data(Storage.data);
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
