import types from "./actionsTypes";

const user = (state = null, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return action.user;
    default:
      return state;
  }
};

export default user;
