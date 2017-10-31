import Deck from '../../model/Deck';

function buildDeck(doc) {
  return Deck({
    id: doc.id,
    ...doc.data()
  });
}

export default buildDeck;
