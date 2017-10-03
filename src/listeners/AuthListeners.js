import Auth from '../services/auth/Auth';
import OnSignInAction from '../actions/OnSignInAction';
import OnSignOutAction from '../actions/OnSignOutAction';

/**
 * Listens to authentication services and executes actions.
 */
class AuthListeners {

  initialize() {
  Auth.onAuthStateChanged(user => {
      if (user) {
        this.onSignIn(user);
      } else {
        this.onSignOut();
      }
    });
  }

  onSignIn(user) {
    new OnSignInAction(user).execute();
  }

  onSignOut() {
    new OnSignOutAction().execute();
  }

}

export default new AuthListeners();
