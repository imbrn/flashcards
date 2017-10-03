import Listeners from '../utils/Listeners';

import { auth } from 'firebase';

/**
 * Authentication services.
 */
class Auth {
  
  constructor() {
    this._listeners = new Listeners();
  }

  initialize() {
    auth().onAuthStateChanged(user => this._authStateChanged(user));
    auth().signInAnonymously();
  }

  onAuthStateChanged(listener) {
    return this._listeners.on(user => {
      listener(user);
    });
  }

  _authStateChanged(user) {
    this._listeners.fire(user);
  }

}

export default new Auth();
