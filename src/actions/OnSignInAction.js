import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Action called when user is signed in.
 */
class OnSignInAction {

  constructor(user) {
    this.user = user;
  }

  execute() {
    Dispatcher.dispatch({
      type: OnSignInAction.type,
      user: this.user
    });
  }

  static type() {
      return 'ON_SIGN_IN';
  }
  
}

export default OnSignInAction;
