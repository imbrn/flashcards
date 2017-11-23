import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CardsPage from './cards/CardsPage';
import DecksPage from './decks/DecksPage';
import NotFoundPage from './NotFoundPage';

const Main = () => {
  return (
    <BrowserRouter>
      <div className='font-sans font-light text-black bg-grey-lightest min-h-full'>
        <MainContent />
      </div>
    </BrowserRouter>
  );
};

const MainContent = () => {
  return (
    <Switch>
      <Route path='/decks/:deckId' exact={true} component={CardsPage} />
      <Route path='/decks' exact={true} component={DecksPage} />
      <Route path='/' exact={true} component={() => <Redirect to='/decks/1' />} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Main;
