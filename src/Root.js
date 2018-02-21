import React from "react";
import Main from "./pages/Main";
import Decks from "./pages/Decks";
import Deck from "./pages/Deck";
import Cards from "./pages/Cards";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/decks" exact component={Decks} />
        <Route path="/decks/:deckId" exact component={Deck} />
        <Route path="/cards" exact component={Cards} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default Root;