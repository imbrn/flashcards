import React from 'react';
import styles from './View.module.css';

class View extends React.Component {

  render() {
    return (
      <div>
        <div>{this.props.deck.name}</div>
        <div>{this.props.deck.description}</div>
      </div>
    );
  }

}

export default View;
