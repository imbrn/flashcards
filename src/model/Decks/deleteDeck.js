const deleteDeck = (decks, deck) => {
  // TODO: delete the deck's cards from server too
  return decks.decksRef.doc(deck.id).delete();
};

export default deleteDeck;
