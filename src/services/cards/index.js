import { userRef } from "../auth";

function listen(onChange = () => {}) {
  return cardsRef().onSnapshot(
    { includeQueryMetadataChanges: true },
    snapshot => {
      const cards = [];
      snapshot.forEach(doc => {
        cards.push({
          ...doc.data(),
          id: doc.id,
          fromCache: doc.metadata.fromCache,
          hasPendingWrites: doc.metadata.hasPendingWrites
        });
      });
      onChange(cards);
    }
  );
}

export function cardsRef() {
  return userRef().collection("cards");
}

export default {
  listen
};
