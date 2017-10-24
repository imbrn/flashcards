import React from 'react';
import { Redirect } from 'react-router-dom';
import Decks from './Decks';
import Deck from './Deck';

export default [
  { path: '/', component: () => <Redirect to='/decks' />, exact: true },
  { path: '/decks', component: Decks, exact: true },
  { path: '/decks/:deckId', component: Deck, exact: true }
];
