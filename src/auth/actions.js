import actionsTypes from "./actionsTypes.js";

const startSigningIn = () => {
  return {
    type: actionsTypes.START_SIGNING_IN,
  };
};

const signIn = (user) => {
  return {
    type: actionsTypes.SIGN_IN,
    user,
  };
};

const signOut = () => {
  return {
    type: actionsTypes.SIGN_OUT,
  };
};

const signInFailed = () => {
  return {
    type: actionsTypes.SIGN_IN_FAILED,
  };
};

export default {
  startSigningIn,
  signIn,
  signOut,
  signInFailed,
};

