import React from 'react';
import DecksStore from '../../flux/Decks/Store';
import DecksActions from '../../flux/Decks/Actions';
import CreatingDeckStore from '../../flux/CreatingDeck/Store';
import EditingDeckStore from '../../flux/EditingDeck/Store';
import DeletingDeckStore from '../../flux/DeletingDeck/Store';
import View from './View';

class Container extends React.Component {

  state = {
    decks: DecksStore.getState(),
    creatingDeck: CreatingDeckStore.getState(),
    editingDeck: EditingDeckStore.getState(),
    deletingDeck: DeletingDeckStore.getState()
  };

  componentDidMount() {
    this._initStores();
    DecksActions.watchAllDecks();
  }

  _initStores() {
    this._decksStoreListener = DecksStore.addListener(this._decksStoreChanged.bind(this));
    this._creatingDeckStoreListener =
      CreatingDeckStore.addListener(this._creatingDeckStoreChanged.bind(this));
    this._editingDeckStoreListener =
      EditingDeckStore.addListener(this._editingDeckStoreChanged.bind(this));
    this._deletingDeckStoreListener =
      DeletingDeckStore.addListener(this._deletingDeckStoreChanged.bind(this));
  }

  _decksStoreChanged() {
    this.setState({
      decks: DecksStore.getState()
    });
  }

  _creatingDeckStoreChanged() {
    this.setState({
      creatingDeck: CreatingDeckStore.getState()
    });
  }

  _editingDeckStoreChanged() {
    this.setState({
      editingDeck: EditingDeckStore.getState()
    });
  }

  _deletingDeckStoreChanged() {
    this.setState({
      deletingDeck: DeletingDeckStore.getState()
    });
  }

  render() {
    return <View
      decks={this.state.decks}
      creatingDeck={this.state.creatingDeck}
      editingDeck={this.state.editingDeck}
      deletingDeck={this.state.deletingDeck}
    />;
  }

  componentWillUnmount() {
    DecksActions.stopWatchingAllDecks();
    this._removeStores();
  }

  _removeStores() {
    this._decksStoreListener.remove();
    this._creatingDeckStoreListener.remove();
    this._editingDeckStoreListener.remove();
    this._deletingDeckStoreListener.remove();
  }

}

export default Container;
