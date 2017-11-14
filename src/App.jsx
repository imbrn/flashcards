import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DecksPage from './pages/DecksPage';
import DeckPage from './pages/DeckPage';
import StudyPage from './pages/StudyPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <div>
      <ContentRoutes />
    </div>
  );
};

const ContentRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact={true} component={() => <Redirect to='/decks' />} />
      <Route path='/decks' component={DeckPage} />
      <Route path='/deck/:deckId' component={DeckPage} />
      <Route path='/study/:deckId' component={StudyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
