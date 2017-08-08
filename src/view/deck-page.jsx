import React from 'react';
import { Container } from 'flux/utils';
import DecksStore from '../data/decks-store.js';
import DecksActions from '../data/decks-actions';

/**
 * One deck page.
 */
class DeckPage extends React.Component {

  static getStores() {
    return [DecksStore];
  }

  static calculateState(prevState, props) {
    const id = props.match.params.deckId;
    return {
      deck: DecksStore.getState().get(id)
    };
  }

  componentWillMount() {
    DecksActions.loadDecks();
  }

  render() {
    return (
      <h1>{this.state.deck.name}</h1>
    );
  }

}

export default Container.create(DeckPage, {withProps: true});
