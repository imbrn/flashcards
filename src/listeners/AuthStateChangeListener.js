import { auth } from 'firebase';
import Dispatcher from '../dispatcher/Dispatcher';
import SIGN_IN from '../actions/types/SignIn';
import SIGN_OUT from '../actions/types/SignOut';

/**
 * Authentication state change listener.
 */
class AuthStateChangeListener {

  listen() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.onSignIn(user);
      } else {
        this.onSignOut();
      }
    });
  }

  onSignIn(user) {
    Dispatcher.dispatch({
      type: SIGN_IN,
      user
    });
  }

  onSignOut() {
    Dispatcher.dispatch({
      type: SIGN_OUT
    });
  }
  
}

export default AuthStateChangeListener;
