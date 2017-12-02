import { SignInState } from "./models";

const isSignedIn = (auth) => {
  return auth.signInState === SignInState.SIGNED_IN;
};

const isSignedOut = (auth) => {
  return auth.signInState === SignInState.SIGNED_OUT;
};

const isSigningIn = (auth) => {
  return auth.signInState === SignInState.SIGNING_IN;
};

const isFailed = (auth) => {
  return auth.signInState === SignInState.FAILED;
};

export default {
  isSignedIn,
  isSignedOut,
  isSigningIn,
  isFailed,
};
