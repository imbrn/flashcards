import React from 'react';
import { Container } from 'flux/utils';
import DecksActions from '../data/decks-actions';
import DeckStore from '../data/deck-store.js';
import Typography from 'material-ui/Typography';

/**
 * One deck page.
 */
class DeckPage extends React.Component {

  static getStores() {
    return [DeckStore];
  }

  static calculateState() {
    return {
      deck: DeckStore.getState()
    };
  }

  componentWillMount() {
    const deckId = parseInt(this.props.match.params.deckId, 10);
    DecksActions.fetchDeckById(deckId);
  }

  render() {
    if (this.state.deck) {
      return this._renderDeck();
    } else {
      return <span>No deck</span>;
    }
  }

  _renderDeck() {
    return (
      <div>
        <Typography>{this.state.deck.name}</Typography>
      </div>
    );
  }

}

/*
DeckPageTitle
*/
class Title extends React.Component {

  static getStores() {
    return [DeckStore];
  }

  static calculateState() {
    return {
      deck: DeckStore.getState()
    };
  }

  render() {
    if (this.state.deck) {
      return this._renderDeck();
    } else {
      return <span/>;
    }
  }

  _renderDeck() {
    return (
      <span>
        {this.state.deck.name}
      </span>
    );
  }

}

const TitleContainer = Container.create(Title);

export default Container.create(DeckPage);
export {
  TitleContainer as DeckPageTitle
};
