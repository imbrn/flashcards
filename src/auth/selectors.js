import { Situation } from "./models";

const isSigningIn = (auth) => {
  return auth.situation === Situation.SIGNING_IN;
};

const isSignedIn = (auth) => {
  return auth.situation === Situation.SIGNED_IN;
};

const isSignedOut = (auth) => {
  return auth.situation === Situation.SIGNED_OUT;
};

export default {
  isSigningIn,
  isSignedIn,
  isSignedOut,
};
