import React from 'react';
import DecksPage, { DecksPageTitle, DecksPageActions } from './decks-page';
import { Redirect } from 'react-router-dom';

const Routes = [
  {
    path: '/decks',
    page: DecksPage,
    title: DecksPageTitle,
    actions: DecksPageActions
  },
  {
    path: '/',
    page: () => <Redirect to="/decks" />
  }
];

export default Routes;
