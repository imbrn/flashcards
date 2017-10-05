import initializeFirebase from './firebase/initialize';
import initializeListeners from './listeners/initialize';
import SignInAnonymouslyAction from './actions/SignInAnonymouslyAction';

/*
 * Initialize the application.
 */
function initialize() {
  initializeFirebase();
  initializeListeners();

  // Initialy, sign in anonymously
  new SignInAnonymouslyAction().execute();
}

export default initialize;
