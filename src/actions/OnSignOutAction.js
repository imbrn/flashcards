import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Dispatches an action indicating user is signed out.
 */
class OnSignOutAction {

  execute() {
    Dispatcher.dispatch({
      type: OnSignOutAction.type
    });
  }

  static type() {
    return 'ON_SIGN_OUT';
  }

}

export default new OnSignOutAction();
