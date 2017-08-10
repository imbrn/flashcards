import React from 'react';
import DecksPage, { DecksPageTitle } from './decks-page';
import DeckPage, { DeckPageTitle, DeckPageActions } from './deck-page';
import { Redirect } from 'react-router-dom';

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
