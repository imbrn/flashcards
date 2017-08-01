import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './app';
import DecksActions from './data/decks-actions';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// TODO: remover testes (também: import DecksActions)
DecksActions.addDeck("Pronouns", "Pronomes");
DecksActions.addDeck("Nouns", "Substantivos");
window.DecksActions = DecksActions;
