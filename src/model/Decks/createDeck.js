import { firestore } from 'firebase';

function createDeck(decks, deck) {
  return decks.decksRef.add({
    name: deck.name,
    description: deck.description,
    createTime: firestore.FieldValue.serverTimestamp(),
    updateTime: firestore.FieldValue.serverTimestamp()
  });
}

export default createDeck;
