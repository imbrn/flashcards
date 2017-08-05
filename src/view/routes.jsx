import React from 'react';
import DecksPage, { DecksPageTitle } from './decks-page';
import DeckPage from './deck-page';
import { Redirect } from 'react-router-dom';

const Routes = [
  {
    path: '/decks/:deckId',
    page: DeckPage
  },
  {
    path: '/decks',
    page: DecksPage,
    title: DecksPageTitle,
    exact: true
  },
  {
    path: '/',
    page: () => <Redirect to="/decks" />,
    exact: true
  }
];

export default Routes;
