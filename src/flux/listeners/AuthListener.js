import { auth } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';

class AuthListener {

  start() {
    this.removeListener = auth().onAuthStateChanged(this.authStateChanged.bind(this));
  }

  authStateChanged(user) {
    if (user) {
      this.onSignIn(user);
    } else {
      this.onSignOut();
    }
  }

  onSignIn(user) {
    Dispatcher.dispatch({
      type: Types.ON_SIGN_IN,
      user
    });
  }

  onSignOut() {
    Dispatcher.dispatch({
      type: Types.ON_SIGN_OUT
    });
  }

  stop() {
    this.removeListener();
  }
  
}

export default AuthListener;
