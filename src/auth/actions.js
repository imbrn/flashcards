import actionsTypes from "./actionsTypes.js";

const startSigningIn = () => {
  return {
    type: actionsTypes.START_SIGNING_IN
  };
};

const endSigningIn = user => {
  return {
    type: actionsTypes.END_SIGNING_IN,
    user
  };
};

const signingInFailed = cause => {
  return {
    type: actionsTypes.SIGN_IN_FAILED,
    cause
  };
};

export default {
  startSigningIn,
  endSigningIn,
  signingInFailed
};
