import React from 'react';
import { auth, firestore } from 'firebase';
import UserDecksStore from '../flux/stores/UserDecksStore';
import DeckDisplay from '../DeckCard/Display';

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
    const items = this.state.decks.toArray().map(deck =>
      <DeckDisplay key={deck.id} deck={deck} options={[
        { label: 'Edit', action: () => console.log(`Editing deck ${deck.id}`) },
        { label: 'Delete', action: () => console.log(`Deleting deck ${deck.id}`) }
      ]}/>
    );

    return (
      <div>
        {items}
      </div>
    );
  }

}

export default DecksPage;

