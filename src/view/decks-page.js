import React from 'react';
import { Container } from 'flux/utils';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import DecksActions from '../data/decks-actions';
import DecksStore, { CreatingDeckStore } from '../data/decks-store';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import CreateDeckDialog from './create-deck-dialog';

/*
Stylesheet.
*/
const stylesheet = createStyleSheet('DecksPage', (theme) => {
  return {
    noDeckContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    decksContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing.unit,
    },
    root: {
      height: '100%'
    },
    deckItem: theme.mixins.gutters({
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      height: 120,
      width: '100%',
      boxSizing: 'border-box',
      [theme.breakpoints.up(528)]: { width: 240, height: 160 },
      [theme.breakpoints.up(601)]: { width: 260, height: 160 },
      [theme.breakpoints.up(701)]: { width: 300, height: 160 },
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
        <Button fab color="accent" className={classes.floatButton} onClick={this.handleCreateDeckButtonClick.bind(this)}>
          <AddIcon />
        </Button>
        <CreateDeckDialog open={this.state.creatingDeck} onRequestClose={this.handleCreateDialogClose.bind(this)} />
      </div>
    );
  }

  renderDecks(classes) {
    if (this.state.decks.length > 0)
      return this.renderDecksItems(classes);
    else
      return this.renderNoDecks(classes);
  }

  renderDecksItems(classes) {
    const items = this.state.decks.map(deck => {
      return <Paper key={deck.id} className={classes.deckItem}>
        <Typography type="title">{deck.name}</Typography>
        <Typography type="body1" className={classes.deckDescription}>{deck.description}</Typography>
        <Typography type="caption">{deck.cards.length} cards.</Typography>
      </Paper>;
    });
    return (
      <div className={classes.decksContainer}>
        {items}
      </div>
    );
  }

  renderNoDecks(classes) {
    return (
      <div className={classes.noDeckContainer}>
        <Typography type="display1">There's no decks yet.</Typography>
        <Typography type="subheading">Click the button to add a new deck.</Typography>
      </div>
    );
  }

  handleCreateDeckButtonClick() {
    DecksActions.startCreatingDeck();
  }

  handleCreateDialogClose() {
    DecksActions.stopCreatingDeck();
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

// exports
export default StyledPage;
export {
  Title as DecksPageTitle
}
