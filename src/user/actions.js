import actionsTypes from "./actionsTypes.js";

const signIn = user => {
  return {
    type: actionsTypes.SIGN_IN,
    user
  };
};

export default {
  signIn
};
