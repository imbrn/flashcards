import { User } from "./user";
import "firebase/firestore";
import { initializeApp } from "firebase";
import config from "./config/config";

class Services {
  initialize() {
    initializeApp(config);
  }

  initialSignIn() {
    return User.anonymousUser().then(user => {
      this._currentUser = user;
      return user;
    });
  }

  get currentUser() {
    return this._currentUser;
  }
}

export default Services;
