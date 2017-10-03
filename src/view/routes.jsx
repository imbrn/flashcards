import React from 'react';
import { Redirect } from 'react-router';
import DecksPage from './pages/DecksPage';

/**
 * Pages routes.
 */
const routes = [
  {
    path: '/decks',
    page: DecksPage,
    title: () => <span>DecksPage</span>,
    exact: true
  },
  {
    path: '/',
    page: () => <Redirect to='/decks' />,
    exact: true
  }
];

export default routes;
