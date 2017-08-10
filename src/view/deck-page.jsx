import React from 'react';
import { Container } from 'flux/utils';
import DecksActions from '../data/decks-actions';
import DeckStore from '../data/deck-store.js';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Actions from './actions';
import ActionsTypes from './actions-types';

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
    Actions.addListener(this);
    const deckId = parseInt(this.props.match.params.deckId, 10);
    DecksActions.fetchDeckById(deckId);
  }

  componentWillUnmount() {
    Actions.removeListener(this);
  }

  onActionPerformed(action) {
    this.setState({
      action
    });
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
        {this._renderAddCard()}
      </div>
    );
  }

  _renderAddCard() {
    return <Typography>{this.state.action}</Typography>;
  }

}

/*
DeckPageTitle
*/
class PageTitle extends React.Component {

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

const TitleContainer = Container.create(PageTitle);

/*
DeckPageActions
*/
class PageActions extends React.Component {
  
  render() {
    return (
      <Button color="inherit" onClick={this.handleAddCardClick.bind(this)}>
        Add card
      </Button>
    );
  }
  
  handleAddCardClick() {
    Actions.execute(ActionsTypes.ADD_CARD);
  }

}

export default Container.create(DeckPage);
export {
  TitleContainer as DeckPageTitle,
  PageActions as DeckPageActions
};
