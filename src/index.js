import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import DecksActions from './data/decks-actions';
import RootContainer from './containers/root-container';
import './index.css';

ReactDOM.render(<RootContainer />, document.getElementById('root'));
registerServiceWorker();

DecksActions.addDeck('One', 'Deck one');
DecksActions.addDeck('Two', 'Deck two');
window.DecksActions = DecksActions;
