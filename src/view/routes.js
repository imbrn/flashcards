import React from 'react';
import DecksPage, { DecksPageTitle } from './decks-page';
import { Redirect } from 'react-router-dom';

const Routes = [
  {
    path: '/decks',
    page: DecksPage,
    title: DecksPageTitle
  },
  {
    path: '/',
    page: () => <Redirect to="/decks" />
  }
];

export default Routes;
