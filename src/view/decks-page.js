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
    root: {
      padding: 20,
      display: 'flex',
      flexWrap: 'wrap'
    },
    deckItem: theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minHeight: 140,
      minWidth: 240,
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
    },
    [theme.breakpoints.down(648)]: {
      deckItem: { minWidth: 200 }
    },
    [theme.breakpoints.down(536)]: {
      deckItem: { width: '100%' }
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
    return this.state.decks.map(deck => {
      return <Paper key={deck.id} className={classes.deckItem}>
        <Typography type="title">{deck.name}</Typography>
        <Typography type="body1" className={classes.deckDescription}>{deck.description}</Typography>
        <Typography type="caption">{deck.cards.length} cards.</Typography>
      </Paper>;
    });
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
