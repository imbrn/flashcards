import { Record } from "immutable";

export const UserModel = Record({
  uid: null,
  displayName: null,
});

export const SignInState = {
  SIGNING_IN: 'SIGNING_IN',
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  FAILED: 'FAILED',
};
