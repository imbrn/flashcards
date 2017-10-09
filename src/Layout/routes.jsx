import React from 'react';
import { Redirect } from 'react-router-dom';
import DecksPage from '../DecksPage';

const routes = [
  { path: '/decks', component: DecksPage, exact: true },
  { path: '/', component: () => <Redirect to='/decks' />, exact: true }
];

export default routes;
