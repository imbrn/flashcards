import { firestore } from "firebase";
import { userRef } from "../auth";
import { cardsRef } from "../cards";
import { deleteQuery } from "../utils";

function listen(onChange = () => {}) {
  return decksRef().onSnapshot(
    { includeQueryMetadataChanges: true },
    snapshot => {
      const decks = [];
      snapshot.forEach(doc => {
        decks.push({
          ...doc.data(),
          id: doc.id,
          fromCache: doc.metadata.fromCache,
          hasPendingWrites: doc.metadata.hasPendingWrites
        });
      });
      onChange(decks);
    }
  );
}

function create(data) {
  return decksRef().add({
    ...data,
    createTime: firestore.FieldValue.serverTimestamp(),
    updateTime: firestore.FieldValue.serverTimestamp()
  });
}

function remove(deckId) {
  return Promise.all([
    deleteQuery(firestore(), cardsRef().where("deckId", "==", deckId)),
    deckRef(deckId).delete()
  ]);
}

function update(deckId, data) {
  return deckRef(deckId).update(data);
}

export function decksRef() {
  return userRef().collection("decks");
}

export function deckRef(deckId) {
  return decksRef().doc(deckId);
}

export default {
  listen,
  create,
  remove,
  update
};
