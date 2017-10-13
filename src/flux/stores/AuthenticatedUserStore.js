import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Types from '../actions/Types';

class AuthenticatedUserStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case Types.AUTH_SIGNED_IN: return action.user;
      case Types.AUTH_SIGNED_OUT: return null;
      default: return state;
    }
  }

}

export default new AuthenticatedUserStore();
