import { User } from "./user";
import "firebase/firestore";
import { initializeApp } from "firebase";
import config from "./config/config";

class Services {
  initialize() {
    initializeApp(config);
  }

  initialSignIn() {
    return User.anonymousUser();
  }
}

export default Services;
