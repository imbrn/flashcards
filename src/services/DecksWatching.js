import buildDeck from './utils/buildDeck';
import DeckWatching from './DeckWatching';

class DecksWatching {

  constructor(ref, listener) {
    this._ref = ref;
    this._listener = listener;
    this._DecksWatchings = {};
  }

  watch() {
    this._stopWatcher = this._ref.onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') this._fireOnAddDeck(change.doc);
        if (change.type === 'removed') this._fireOnDeleteDeck(change.doc);
        if (change.type === 'modified') this._fireOnChangeDeck(change.doc);
      });
    });
  }

  _fireOnAddDeck(doc) {
    this._watchDeck(doc);
    if (this._listener && this._listener.onAddDeck)
      this._listener.onAddDeck(buildDeck(doc));
  }

  _watchDeck(doc) {
    const watcher = new DeckWatching(doc.ref, this);
    watcher.watch();
    this._DecksWatchings[doc.id] = watcher;
  }

  onAddCard(card, deckId) {
    if (this._listener && this._listener.onAddCard)
      this._listener.onAddCard(card, deckId);
  }

  onDeleteCard(card, deckId) {
    if (this._listener && this._listener.onDeleteCard)
      this._listener.onDeleteCard(card, deckId);
  }

  onChangeCard(card, deckId) {
    if (this._listener && this._listener.onChagenCard)
      this._listener.onChangeCard(card, deckId);
  }

  _fireOnDeleteDeck(doc) {
    this._stopWatcherDeck(doc);
    if (this._listener && this._listener.onDeleteDeck)
      this._listener.onDeleteDeck(buildDeck(doc));
  }

  _stopWatcherDeck(doc) {
    if (this._DecksWatchings.hasOwnProperty(doc.id)) {
      this._DecksWatchings[doc.id].stop();
      delete this._DecksWatchings[doc.id];
    }
  }

  _fireOnChangeDeck(doc) {
    if (this._listener && this._listener.onChangeDeck)
      this._listener.onChangeDeck(buildDeck(doc));
  }

  stop() {
    this._stopDecksWatchings();
    if (this._stopWatcher)
      this._stopWatcher();
  }

  _stopDecksWatchings() {
    for (const key in this._DecksWatchings) {
      this._DecksWatchings[key].stop();
    }
    this._DecksWatchings = {};
  }

}

export default DecksWatching;
