import React from 'react';
import { withStyles } from 'material-ui/styles';
import { auth, firestore } from 'firebase';
import UserDecksStore from '../flux/stores/UserDecksStore';
import CreatingDeckStore from '../flux/stores/CreatingDeckStore';
import CreatingDeckActions from '../flux/actions/CreatingDeckActions';
import DeckDisplay from '../DeckCard/Display';
import DeckEdit from '../DeckCard/Edit';
import stylesheets from './DecksPage.style';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class DecksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decks: UserDecksStore.getState(),
      creatingDeck: CreatingDeckStore.getState()
    }
  }

  componentWillMount() {
    this.removeUserDecksStoreListener = UserDecksStore.addListener(this.userDecksStoreChanged.bind(this));
    this.removeCreatingDeckStoreListener = CreatingDeckStore.addListener(this.creatingDeckStoreChanged.bind(this));
  }

  userDecksStoreChanged() {
    this.setState({
      decks: UserDecksStore.getState()
    });
  }

  creatingDeckStoreChanged() {
    this.setState({
      creatingDeck: CreatingDeckStore.getState()
    });
  }

  componentWillUnmount() {
    this.removeUserDecksStoreListener();
    this.removeCreatingDeckStoreListener();
  }

  render() {
    const classes = this.props.classes;
    const items = this.state.decks.toArray().map(deck =>
      <DeckDisplay className={classes.deck} key={deck.id} deck={deck} options={[
        { label: 'Edit', action: () => console.log(`Editing deck ${deck.id}`) },
        { label: 'Delete', action: () => console.log(`Deleting deck ${deck.id}`) }
      ]}/>
    );

    return (
      <div className={classes.root}>
        <div className={classes.decks}>
          {items}
          {this.renderCreatingDeck(classes)}
        </div>
        <Button className={classes.actionButton} fab color="accent" onClick={this.actionButtonClicked.bind(this)}>
          <AddIcon />
        </Button>
      </div>
    );
  }

  renderCreatingDeck(classes) {
    if (this.state.creatingDeck) {
        return <DeckEdit className={classes.deck}
          validation={(key, value) => key === 'description' || value.length > -1}
          onDeckChanged={this.creatingDeckChanged.bind(this)}
          onFinished={this.creatingDeckFinished.bind(this)}
          onCanceled={this.creatingDeckCanceled.bind(this)}
        />;
    }
    return null;
  }

  actionButtonClicked() {
    CreatingDeckActions.start();
  }

  creatingDeckChanged(deck) {
    CreatingDeckActions.updateDeck(deck);
  }

  creatingDeckFinished(deck) {
    CreatingDeckActions.finish(deck);
  }

  creatingDeckCanceled() {
    CreatingDeckActions.cancel();
  }

}

export default withStyles(stylesheets)(DecksPage);

