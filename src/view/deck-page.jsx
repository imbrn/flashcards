import React from 'react';
import { Container } from 'flux/utils';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import DecksActions from '../data/decks-actions';
import DeckStore from '../data/deck-store.js';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Actions from './actions';
import ActionsTypes from './actions-types';

/*
DeckPage stylesheets.
*/
const stylesheet = createStyleSheet('DeckPage', () => {
  return {
    root: {
      height: '100%'
    },
    noCardsContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
});

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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this._renderPage(classes)}
      </div>
    );
  }

  _renderPage(classes) {
    if (this.state.deck) {
      return this._renderCards(classes);
    } else {
      return <span>No deck</span>;
    }
  }

  _renderCards(classes) {
    if (this.state.deck.cards.size > 0) {
      return this._renderCardsItems(classes);
    } else {
      return this._renderNoCardsMessage(classes);
    }
  }

  _renderCardsItems() {
    return <span/>;
  }

  _renderNoCardsMessage(classes) {
    return (
      <div className={classes.noCardsContainer}>
        <Typography type="display1">No cards</Typography>
        <Typography type="subheading">There's no added cards yet.</Typography>
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
      return <span />;
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

export default withStyles(stylesheet)(Container.create(DeckPage));

export {
  TitleContainer as DeckPageTitle,
  PageActions as DeckPageActions
};
