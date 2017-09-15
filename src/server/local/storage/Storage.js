/**
 * Storage base.
 * It provides a base interface with util structure for implementation of concrete storages.
 */
class Storage {

  get data() {
    return this._data;
  }

  set data(it) {
    this._data = it;
    this.onChange(this._data);
  }

  reset() {
    this.data = null;
  }

}

/**
 * Mock storage object for testing.
 */
class MockStorage extends Storage {

  constructor(initialData) {
    super();
    this.data = initialData;
  }

  onChange(data) {
    this.changedData = data;
  }
  
}

export default Storage;
export {
  MockStorage
};
