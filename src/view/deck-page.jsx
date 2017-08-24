import React from 'react';
import { Container } from 'flux/utils';
import { withStyles } from 'material-ui/styles';
import DecksActions from '../data/decks-actions';
import DeckStore from '../data/deck-store.js';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Actions from './actions';
import ActionsTypes from './actions-types';
import AddCardDialog from './add-card-dialog';
import Card from './card/card';

/*
DeckPage stylesheets.
*/
const stylesheet = () => {
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
};

/**
 * One deck page.
 */
class DeckPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addingCard: false
    };
  }

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
    if (action === ActionsTypes.ADD_CARD) {
      this.setState({ addingCard: true });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderAddCardDialog()}
        {this.renderPage(classes)}
      </div>
    );
  }

  renderAddCardDialog() {
    if (this.state.addingCard) {
      return <AddCardDialog
        onCreateCard={this.onCreateCard.bind(this)}
        onRequestClose={this.onDialogRequestClose.bind(this)}
      />;
    } else {
      return null;
    }
  }

  onCreateCard(card) {
    let deck = this.state.deck;
    deck = deck.set('cards', deck.cards.push(card));
    this.setState({
      deck,
      addingCard: false
    });
    DecksActions.updateDeck(deck);
  }

  onDialogRequestClose() {
    this.setState({ addingCard: false });
  }

  renderPage(classes) {
    if (this.state.deck) {
      return this.renderCards(classes, this.state.deck.cards);
    } else {
      return <span>Loading...</span>;
    }
  }

  renderCards(classes) {
    const cards = this.state.deck.cards;
    if (cards && cards.size > 0) {
      return this.renderCardsItems(classes, cards);
    } else {
      return this.renderNoCardsMessage(classes);
    }
  }

  renderCardsItems(classes, cards) {
    const items = cards.map((card, index) => {
      return <Card key={index} kcard={card} />;
    });
    return <div>{items}</div>;
  }

  renderNoCardsMessage(classes) {
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
      return this.renderDeck();
    } else {
      return <span />;
    }
  }

  renderDeck() {
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
function PageActions() {
  return (
    <Button color="inherit" onClick={() => Actions.execute(ActionsTypes.ADD_CARD)}>
      Add card
    </Button>
  );
}

export default withStyles(stylesheet)(Container.create(DeckPage));

export {
  TitleContainer as DeckPageTitle,
  PageActions as DeckPageActions
};
