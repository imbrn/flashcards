import { auth } from "firebase";
import { Decks } from "../decks";

/**
 * Proxy class represeting an User data object.
 * It's used to perform real operations on the User object like it was the real
 * object.
 */
class User {
  static anonymousUser() {
    return new Promise((resolve, reject) => {
      auth()
        .signInAnonymously()
        .then(user => {
          resolve(new User(user));
        })
        .catch(reject);
    });
  }

  constructor(user) {
    this._user = user;
  }

  getDecks() {
    return Decks.getUserDecks(this);
  }

  get user() {
    return this._user;
  }
}

export default User;
