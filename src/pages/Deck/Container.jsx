import React from 'react';
import View from './View';
import Deck from '../../model/Deck';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: null 
    };
  }

  componentWillMount() {
    const deckId = this.props.match.params.deckId;
    // TODO: load real deck from server
    // This is only a fake deck for testing purpose
    this.setState({
      deck: Deck({
        id: deckId,
        name: `Deck ${deckId}`,
        description: `This is the deck ${deckId}`,
        cards: {
          '1': { front: 'One', back: 'Um' },
          '2': { front: 'Two', back: 'Dois' }
        }
      })
    });
  }

  render() {
    return <View deck={this.state.deck} />;
  }

}

export default Container;
