import { Record } from "immutable";

export const UserModel = Record({
  uid: null,
  displayName: null,
});

export const Situation = {
  INITIALIZED: 0,
  SIGNING_IN: 1,
  SIGNED_IN: 2,
  SIGNED_OUT: 3,
  FAILED: 4,
};

