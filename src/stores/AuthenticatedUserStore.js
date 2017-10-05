import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import SIGN_IN from '../actions/types/SignIn';
import SIGN_OUT from '../actions/types/SignOut';

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
    case SIGN_IN: return this.onSignIn(action);
    case SIGN_OUT: return this.onSignOut();
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
