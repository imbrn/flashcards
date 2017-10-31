import React from 'react';
import View from './View';
import Deck from '../../model/Deck';
import CreatingCardStore from '../../flux/CreatingCard/Store';
import DeckStore from '../../flux/Deck/Store';
import DeckActions from '../../flux/Deck/Actions';

class Container extends React.Component {

  state = {
    deck: Deck(),
    creatingCard: CreatingCardStore.getState()
  };

  componentWillMount() {
    this._initStores();
    this._watchDeck();
  }

  _initStores() {
    this._deckStoreListener = DeckStore.addListener(
      this._deckStoreChanged.bind(this));
    this._creatingCardStoreListener = CreatingCardStore.addListener(
      this._creatingCardStoreChanged.bind(this));
  }

  _deckStoreChanged() {
    this.setState({ deck: DeckStore.getState() });
  }

  _creatingCardStoreChanged() {
    this.setState({ creatingCard: CreatingCardStore.getState() });
  }

  _watchDeck() {
    const deckId = this.props.match.params.deckId;
    DeckActions.watch(deckId);
  }

  render() {
    return <View
      deck={this.state.deck}
      creatingCard={this.state.creatingCard}
    />;
  }

  componentWillUnmount() {
    this._deckStoreListener.remove();
    this._creatingCardStoreListener.remove();
    DeckActions.stopWatching();
  }

}

export default Container;
