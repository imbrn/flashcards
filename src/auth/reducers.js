import { combineReducers } from "redux";
import types from "./actionsTypes";
import { UserModel, SignInState } from "./models";

const signInFailCause = (state = null, action) => {
  switch (action.type) {
    case types.SIGN_IN_FAILED:
      return action.cause;
    case types.START_SIGNING_IN:
    case types.END_SIGNING_IN:
      return null;
    default:
      return state;
  }
};

const signInState = (state = SignInState.SIGNED_OUT, action) => {
  switch (action.type) {
    case types.START_SIGNING_IN:
      return SignInState.SIGNING_IN;
    case types.END_SIGNING_IN:
      return action.user ? SignInState.SIGNED_IN : SignInState.SIGNED_OUT;
    case types.SIGN_IN_FAILED:
      return SignInState.FAILED;
    default:
      return state;
  }
};

const user = (state = UserModel(), action) => {
  switch (action.type) {
    case types.ON_SUCCESS:
      return UserModel(action.user);
    case types.ON_FAIL:
      return UserModel();
    default:
      return state;
  }
};

const reducer = combineReducers({
  signInState,
  signInFailCause,
  user
});

export default reducer;
