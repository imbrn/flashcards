import { firestore } from 'firebase';

function updateDeck(decks, deck) {
  return decks.decksRef.doc(deck.id).update({
    name: deck.name,
    description: deck.description,
    updateTime: firestore.FieldValue.serverTimestamp()
  });
}

export default updateDeck;
