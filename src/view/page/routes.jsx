import React from 'react';
import { Redirect } from 'react-router-dom';
import DecksPage, { DecksPageTitle } from './DecksPage';
import DeckPage, { DeckPageTitle, DeckPageActions } from './DeckPage';

const Routes = [
  {
    path: '/decks/:deckId',
    page: DeckPage,
    title: DeckPageTitle,
    actions: DeckPageActions
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
