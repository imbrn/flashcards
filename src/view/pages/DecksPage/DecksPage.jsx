import React from 'react';
import { withStyles } from 'material-ui/styles';
import DecksStore from '../../../stores/DecksStore';
import CreateDeckAction from '../../../actions/CreateDeckAction';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeckCardDisplay from '../../components/DeckCard/Display';
import DeckCardEditable from '../../components/DeckCard/Editable';
import stylesheets from './DecksPage.style';

/**
 * Decks pages.
 */
class DecksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decks: DecksStore.getState(),
      creatingDeck: true
    };
  }

  componentWillMount() {
    this.removeOnDecksStoreChangeListener = DecksStore.addListener(this._decksStoreChanged.bind(this));
  }

  componentWillUnmount() {
    this.removeOnDecksStoreChangeListener();
  }

  _decksStoreChanged() {
    this.setState({
      decks: DecksStore.getState()
    });
  }

  render() {
    const { classes } = this.props;
    const decks = this.state.decks;
    return (
      <div className={classes.root}>
        <DecksContainer classes={classes} decks={decks} creatingDeck={this.state.creatingDeck} />
        <CreateDeckButton classes={classes} onClick={this.createDeck.bind(this)}/>
      </div>
    );
  }

  createDeck() {
    this.setState({ creatingDeck: false });
  }

}

/*
 * This is the container used to exhibit decks. If it has no decks to be shown,
 * exhibits a message indicating that.
 */
function DecksContainer(props) {
  if (props.decks || props.creatingDeck) {
    return <DecksItems decks={props.decks} creating={props.creatingDeck} classes={props.classes} />;
  } else {
    return <NoDecksItems classes={props.classes} />
  }
}

/*
 * Contains all decks: the already added decks and the component which is used
 * to create a new one.
 */
function DecksItems(props) {
  return (
    <div className={props.classes.decksItems}>
      { props.decks ? <AddedDecksItems decks={props.decks} /> : null }
      <AddDeckItem show={props.creating} />
    </div>
  );
}

/*
 * Displays the already added decks.
 */
function AddedDecksItems(props) {
  const items = props.decks.toArray().map(deck => 
    <DeckCardDisplay
      key={deck.id}
      name={deck.name}
      description={deck.description} />
  );
  return items;
}

/*
 * Simulates a deck card and is used to provide the user an input for adding
 * a new deck.
 */
class AddDeckItem extends React.Component {
  constructor(props) {
    super(props);
    this.onDone = this.onDone.bind(this);
  }

  render() {
    return <DeckCardEditable onDone={this.onDone} />
  }

  onDone(data) {
    new CreateDeckAction(data).execute();
  }
}

/*
 * Exhibits a message saying that no decks are added yet.
 */
function NoDecksItems(props) {
  return (
    <div className={props.classes.noDecksItems}>
      <Typography type="display1">
        No decks
      </Typography>
      <Typography type="subheading">
        There's no added decks
      </Typography>
    </div>
  );
}

/*
 * Action button used to trigger a create deck function.
 */
function CreateDeckButton(props) {
  return (
    <Button fab color="accent" onClick={props.onClick}>
      <AddIcon />
    </Button>
  );
}

export default withStyles(stylesheets)(DecksPage);
