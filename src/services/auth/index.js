import { auth, firestore } from "firebase";

function initialSignIn() {
  return auth().signInAnonymously();
}

function user() {
  return auth().currentUser;
}

export function userRef() {
  return firestore()
    .collection("users")
    .doc(user().uid);
}

export default {
  initialSignIn,
  user
};
