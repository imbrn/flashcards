import React from 'react';
import Paper from 'material-ui/Paper';

/**
 * Decks page.
 */
class DecksPage extends React.Component {

  render() {
    const decks = this.props.decks.map(deck => {
      return (
        <Paper key={deck.id}>
          <div><b>{deck.name}</b></div>
          <div><i>{deck.description}</i></div>
        </Paper>
      );
    });

    return (
      <div>
        {decks}
      </div>
    )
  }
}

export default DecksPage;
