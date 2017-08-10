import React from 'react';
import { Container } from 'flux/utils';
import DeckStore from '../data/deck-store.js';

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

  render() {
    return (
      <h1>{this.state.deck.name}</h1>
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
    return <span>{this.state.deck.name}</span>;
  }

}

const TitleContainer = Container.create(Title);

export default Container.create(DeckPage);
export {
  TitleContainer as DeckPageTitle
};
