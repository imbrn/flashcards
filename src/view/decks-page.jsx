import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'flux/utils';
import { withStyles } from 'material-ui/styles';
import DecksActions from '../data/decks-actions';
import DecksStore from '../data/decks-store';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeckItem from './deck-item';
import CreateDeckDialog from './create-deck-dialog';

/*
Stylesheet.
*/
const stylesheet = (theme) => {
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
    floatButton: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 3
    }
  };
};

/**
 * Decks page.
 */
class DecksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creatingDeck: false,
      selectedDeck: null
    };
  }

  static getStores() {
    return [
      DecksStore
    ];
  }

  static calculateState() {
    return {
      decks: DecksStore.getState()
    };
  }

  componentWillMount() {
    DecksActions.fetchAllDecks();
  }

  render() {
    if (this.state.selectedDeck) {
      return <Redirect push to={`/decks/${this.state.selectedDeck.id}`} />;
    } else {
      return this._renderThisPage();
    }
  }

  _renderThisPage() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderDecks(classes)}
        <Button fab color="accent" className={classes.floatButton}
          onClick={this.handleCreateDeckButtonClick.bind(this)}>
          <AddIcon />
        </Button>
        <CreateDeckDialog open={this.state.creatingDeck}
          onCreateDeck={this.handleDialogOnCreateDeck.bind(this)}
          onRequestClose={this.handleDialogClose.bind(this)} />
      </div>
    );
  }

  renderDecks(classes) {
    if (this.state.decks.size > 0)
      return this.renderDecksItems(this.state.decks, classes);
    else
      return this.renderNoDecks(classes);
  }

  renderDecksItems(decks, classes) {
    const items = decks.toArray().map(deck => {
      return <DeckItem key={deck.id} deck={deck} onClick={this.handleCardClick.bind(this, deck)} />;
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

  handleCardClick(deck) {
    this.setState({
      selectedDeck: deck
    });
  }

  handleCreateDeckButtonClick() {
    this.setState({
      creatingDeck: true
    });
  }

  handleDialogOnCreateDeck(deck) {
    this.setState({
      creatingDeck: false
    });
    DecksActions.addDeck(deck);
  }

  handleDialogClose() {
    this.setState({
      creatingDeck: false
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
    return <span>My decks</span>;
  }
}

// exports
export default StyledPage;
export {
  Title as DecksPageTitle
};
