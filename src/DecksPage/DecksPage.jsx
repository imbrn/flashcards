import React from 'react';
import { withStyles } from 'material-ui/styles';
import { auth, firestore } from 'firebase';
import UserDecksStore from '../flux/stores/UserDecksStore';
import DeckDisplay from '../DeckCard/Display';
import stylesheets from './DecksPage.style';

class DecksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decks: UserDecksStore.getState()
    }
  }

  componentWillMount() {
    this.removeUserDecksStoreListener = 
      UserDecksStore.addListener(this.userDecksStoreChanged.bind(this));
  }

  userDecksStoreChanged() {
    this.setState({
      decks: UserDecksStore.getState()
    });
  }

  componentWillUnmount() {
    this.removeUserDecksStoreListener();
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
        </div>
      </div>
    );
  }

}

export default withStyles(stylesheets)(DecksPage);

