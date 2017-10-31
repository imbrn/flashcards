import buildDeck from './utils/buildDeck';
import buildCard from './utils/buildCard';

class DeckWatching {

  constructor(ref, listener) {
    this._ref = ref;
    this._listener = listener;
  }

  watch() {
    this._stopWatching = this._ref.onSnapshot(snapshot => {
      this._fireOnChangeDeck(snapshot);
      this._watchCards();
    });
  }

  _fireOnChangeDeck(doc) {
    if (this._listener && this._listener.onChangeDeck)
      this._listener.onChangeDeck(buildDeck(doc));
  }

  _watchCards() {
    this._ref.collection('cards').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this._fireOnAddCard(change.doc);
        if (change.type === 'removed') this._fireOnDeleteCard(change.doc);
        if (change.type === 'modified') this._fireOnChangeCard(change.doc);
      });
    });
  }

  _fireOnAddCard(doc) {
    if (this._listener && this._listener.onAddCard)
      this._listener.onAddCard(buildCard(doc), this._ref.id);
  }

  _fireOnDeleteCard(doc) {
    if (this._listener && this._listener.onDeleteCard)
      this._listener.onDeleteCard(buildCard(doc), this._ref.id);
  }

  _fireOnChangeCard(doc) {
    if (this._listener && this._listener.onChangeCard)
      this._listener.onChangeCard(buildCard(doc), this._ref.id);
  }

  stop() {
    if (this._stopWatching)
      this._stopWatching();
  }

}

export default DeckWatching;
