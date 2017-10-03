/**
 * Util class for handling listeners.
 */
class Listeners {
  constructor() {
    this._observers = {};
    this._lastId = 0;
  }

  on(listener) {
    const id = this._lastId++;
    this._observers[id] = listener;
    return removeFunction(this, id);
  }

  off(id) {
    delete this._observers[id];
  }

  fire(...params) {
    for (const key in this._observers) {
      this._observers[key](...params);
    }
  }

}

/*
 * Returns a remove function for addded listeners.
 */
function removeFunction(listeners, id) {
  return function() {
    delete listeners._observers[id];
  }
}

export default Listeners;
