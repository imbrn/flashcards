import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DecksPage from '../DecksPage';
import NotFoundPage from '../NotFoundPage';

const Main = () => {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
};

const MainContent = () => {
  return (
    <Switch>
      <Route path='/decks' exact={true} component={DecksPage} />
      <Route path='/' exact={true} component={DecksPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Main;
