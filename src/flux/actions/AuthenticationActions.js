import { auth } from 'firebase';
import Dispatcher from '../Dispatcher';
import Types from './Types';

class AuthenticationActions {
  
  signIn(user) {
    Dispatcher.dispatch({
      type: Types.AUTH_SIGNED_IN,
      user
    });
  }

  signOut() {
    Dispatcher.dispatch({
      type: Types.AUTH_SIGNED_OUT
    });
  }

}

export default new AuthenticationActions();
