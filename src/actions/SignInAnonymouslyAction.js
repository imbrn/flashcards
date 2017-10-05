import { auth } from 'firebase';

/**
 * Anonymous sign in action.
 */
class SignInAnonymouslyAction {

  execute() {
    auth().signInAnonymously();
  }

}

export default SignInAnonymouslyAction;
