import { auth, firestore } from "firebase";
import { Deck } from "../decks";

/**
 * Proxy class represeting an User data object.
 * It's used to perform real operations on the User object like it was the real
 * object.
 */
class User {

  static anonymousUser() {
    return new Promise((resolve, reject) => {
      auth().signInAnonymously().then(user => {
        resolve(new User(user));
      }).catch(reject);
    });
  }

  constructor(user) {
    this._user = user;
  }

  getDecks() {
    return firestore()
      .collection("users").doc(this._user.uid)
      .collection("decks").get().then(this._convertToDecks);
  }

  _convertToDecks(snapshot) {
    const decks = [];
    snapshot.forEach(doc => {
      decks.push(new Deck(doc));
    });
    return decks;
  }

}

export default User;
