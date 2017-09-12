import Storage from './Storage';

/** */
class LocalStorage extends Storage {

  constructor() {
    super();
    this.data = this.load();
  }

  onChange() {
    this.save();
  }

  save() {
    const json = JSON.stringify(this.data);
    window.localStorage.setItem('data', json);
  }

  load() {
    const json = window.localStorage.getItem('data');
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  }

}

/**
 * Mock to use in test with window.localStorage.
 */
class MockLocalStorage {
  constructor() {
    this.clear();
  }
  clear() {
    this.data = {};
  }
  getItem(key) {
    return this.data[key];
  }
  setItem(key, value) {
    this.data[key] = value;
  }
}

export default LocalStorage;
export {
  MockLocalStorage
};
