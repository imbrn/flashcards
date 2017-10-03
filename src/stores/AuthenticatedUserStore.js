import { ReduceStore } from 'flux/utils';
import OnSignInAction from '../actions/OnSignInAction';
import OnSignOutAction from '../actions/OnSignOutAction';
import Dispatcher from '../dispatcher/Dispatcher';

/**
 * Authenticated user store.
 */
class AuthenticatedUserStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case OnSignInAction.type: return this.onSignIn(action);
      case OnSignOutAction.type: return this.onSignOut();
      default: return state;
    }
  }

  onSignIn(action) {
    return action.user;
  }
  
  onSignOut() {
    return null;
  }

}

export default new AuthenticatedUserStore();
