import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import './App.css';
import styles1 from './App.m.css';
import styles2 from './App.module.css';
import DecksPage from './pages/DecksPage';
import DeckPage from './pages/DeckPage';
import StudyPage from './pages/StudyPage';
import NotFoundPage from './pages/NotFoundPage';

console.log(styles1);
console.log(styles2);

const App = () => {
  return (
    <div className={classnames('App', styles1.AppModule1, styles2.AppModule2)}>
      <ContentRoutes />
    </div>
  );
};

const ContentRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact={true} component={() => <Redirect to='/decks' />} />
      <Route path='/decks' component={DecksPage} />
      <Route path='/deck/:deckId' component={DeckPage} />
      <Route path='/study/:deckId' component={StudyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
