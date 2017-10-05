import { auth } from 'firebase';

/**
 * Dispatches an action indicating user is signed out.
 */
class SignOutAction {

  execute() {
    auth().signOut();
  }

}

export default SignOutAction;
