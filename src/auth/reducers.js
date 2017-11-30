import { combineReducers } from "redux";
import types from "./actionsTypes";
import { UserModel, Situation } from "./models";

const situation = (state = Situation.INITIALIZED, action) => {
  switch (action.type) {
    case types.START_SIGNING_IN: return Situation.SIGNING_IN;
    case types.SIGN_IN: return Situation.SIGNED_IN;
    case types.SIGN_OUT: return Situation.SIGNED_OUT;
    case types.SIGN_IN_FAILED: return Situation.FAILED;
    default: return state;
  }
};

const user = (state = UserModel(), action) => {
  switch (action.type) {
    case types.SIGN_IN: return UserModel(action.data);
    case types.START_SIGNING_IN:
    case types.SIGN_OUT:
    case types.SIGN_IN_FAILED:
      return UserModel();
    default: return state;
  }
};

const reducer = combineReducers({
  situation,
  user,
});

export default reducer;
