import { auth } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from './Types';

class AuthenticationActions {

  listen() {
    this.stopListening = auth().onAuthStateChanged(user => {
      if (user) {
        this.userSignedIn(user);
      } else {
        this.userSignedOut();
      }
    });
  }

  userSignedIn(user) {
    Dispatcher.dispatch({
      type: Types.ON_SIGN_IN,
      user
    });
  }

  userSignedOut() {
    Dispatcher.dispatch({
      type: Types.ON_SIGN_OUT
    });
  }

  ensureSignedInUser() {
    if (!auth().currentUser) {
      auth().signInAnonymously();
    }
  }

  unlisten() {
    if (this.stopListening) {
      this.stopListening();
    }
  }

}

export default new AuthenticationActions();
