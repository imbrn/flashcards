import { ReduceStore } from 'flux/utils';
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
      case Types.ON_SIGN_IN: return action.user;
      case Types.ON_SIGN_OUT: return null;
      default: return state;
    }
  }

}

export default new AuthenticatedUserStore();
