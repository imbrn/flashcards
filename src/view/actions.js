/**
 * Used to dispatch actions.
 */
class Actions {

  constructor() {
    this._listeners = [];
  }
  
  execute(action, data = null) {
    this._dispatch(action, data);
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  removeListener(listener) {
    const index = this._listeners.indexOf(listener);
    if (index !== -1)
      this._listeners.splice(index, 1);
  }

  _dispatch(action, data = null) {
    this._listeners.forEach(listener => {
      if (listener.onActionPerformed) {
        listener.onActionPerformed(action, data);
      }
    });
  }

}

export default new Actions();
