import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DecksPage from './decks/DecksPage';
import CardsPage from './cards/CardsPage';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <ContentPages />
      </BrowserRouter>
    );
  }

}

const ContentPages = () => {
  return (
    <Switch>
      <Route path='/decks' exact={true} component={DecksPage} />
      <Route path='/decks/:deckId' exact={true} component={CardsPage} />
      <Route path='/' exact={true} component={DecksPage} />
    </Switch>
  );
};

export default App;
