import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'flux/utils';
import { withStyles } from 'material-ui/styles';
import ActionsTypes from '../ActionsTypes';
import Actions from '../Actions';
import DeckModel from '../../data/DeckModel';
import DecksActions from '../../data/DecksActions';
import DecksStore from '../../data/DecksStore';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DisplayDeckCard from '../component/DeckCard/DisplayDeckCard';
import EditableDeckCard from '../component/DeckCard/EditableDeckCard';

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
    displayDeckCard: {
      cursor: 'default'
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
    Actions.addListener(this);
    DecksActions.fetchAllDecks();
  }

  componentWillUnmount() {
    Actions.removeListener(this);
  }

  onActionPerformed(action) {
    if (action === ActionsTypes.CREATE_DECK) {
      this.setState({ creatingDeck: true });
    }
  }

  render() {
    if (this.state.selectedDeck) {
      return <Redirect push to={`/decks/${this.state.selectedDeck.id}`} />;
    } else {
      return this.renderThisPage();
    }
  }

  renderThisPage() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderDecks(classes)}
        <Button fab color="accent" className={classes.floatButton}
          onClick={this.handleCreateDeckButtonClick.bind(this)}>
          <AddIcon />
        </Button>
      </div>
    );
  }

  renderDecks(classes) {
    if (this.hasDecks())
      return this.renderDecksItems(this.state.decks, classes);
    else
      return this.renderNoDecks(classes);
  }

  hasDecks() {
    return this.state.decks.size > 0 || this.state.creatingDeck;
  }

  renderDecksItems(decks, classes) {
    const items = decks.toArray().map(deck => this.renderDisplayDeckCard(deck, classes, deck.id));
    return (
      <div className={classes.decksContainer}>
        {items}
        {this.renderCreateDeckCard()}
      </div>
    );
  }

  renderDisplayDeckCard(deck, classes, key) {
    return <DisplayDeckCard
      className={classes.displayDeckCard}
      key={key}
      name={deck.name}
      description={deck.description}
      cardsCount={deck.cards.size}
      onClick={this.handleCardClick.bind(this, deck)}
    />;
  }

  renderCreateDeckCard() {
    if (this.state.creatingDeck) {
      return <EditableDeckCard
        onCancel={this.onCreateDeckCancelled.bind(this)}
        onDone={this.onCreateDeckDone.bind(this)}
      />;
    }
  }

  onCreateDeckCancelled() {
    this.setState({ creatingDeck: false });
  }

  onCreateDeckDone(data) {
    const model = new DeckModel(data);
    if (model.isValid()) {
      this.createDeck(model);
    }
  }

  createDeck(model) {
    DecksActions.addDeck(model);
    this.setState({ creatingDeck: false });
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
    this.setState({ creatingDeck: true });
  }

}

const PageContainer = Container.create(DecksPage);
const StyledPage = withStyles(stylesheet)(PageContainer);


/**
 * Decks page title
 */
function Title() {
  return <span>My decks</span>;
}

// exports
export default StyledPage;
export {
  Title as DecksPageTitle
};
