import React from 'react';
import { Container } from 'flux/utils';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import DecksActions from '../data/decks-actions';
import DecksStore, { CreatingDeckStore } from '../data/decks-store';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

/*
Stylesheet.
*/
const stylesheet = createStyleSheet('DecksPage', (theme) => {
  return {
    root: {
      padding: 20,
      display: "flex",
      flexWrap: "wrap"
    },
    deckItem: theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minHeight: 120,
      width: 240,
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing.unit
    }),
    deckDescription: {
      flexGrow: 1
    },
    floatButton: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 3
    }
  };
});

/**
 * Decks page.
 */
class DecksPage extends React.Component {

  static getStores() {
    return [
      DecksStore,
      CreatingDeckStore
    ];
  }

  static calculateState() {
    return {
      decks: DecksStore.getState(),
      creatingDeck: CreatingDeckStore.getState()
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderDecks(classes)}
        <Button fab color="accent" className={classes.floatButton}>
          <AddIcon />
        </Button>
        <h1>Creating: {this.state.creatingDeck.toString()}</h1>
      </div>
    );
  }

  renderDecks(classes) {
    return this.state.decks.map(deck => {
      return <Paper key={deck.id} className={classes.deckItem}>
        <Typography type="title">{deck.name}</Typography>
        <Typography type="body1" className={classes.deckDescription}>{deck.description}</Typography>
        <Typography type="caption">{deck.cards.length} cards.</Typography>
      </Paper>;
    });
  }
}

const PageContainer = Container.create(DecksPage);
const StyledPage = withStyles(stylesheet)(PageContainer);


/**
 * Decks page title
 */
class Title extends React.Component {
  render() {
    return <span>My decks</span>
  }
}

/**
 * Decks page actions.
 */
class Actions extends React.Component {
  render() {
    return (
      <Button color="inherit" onClick={this.startCreatingDeck.bind(this)}>
        Create Deck
      </Button>
    )
  }
  startCreatingDeck() {
    DecksActions.startCreatingDeck();
  }
}

// exports
export default StyledPage;
export {
  Title as DecksPageTitle,
  Actions as DecksPageActions
}
