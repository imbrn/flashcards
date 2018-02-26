import React from "react";
import { Wrapper as UiWrapper } from "./ui";
import Main from "./pages/Main";
import Decks from "./pages/Decks";
import Deck from "./pages/Deck";
import Cards from "./pages/Cards";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducer from "./reducers";

const store = createStore(
  reducer,
  {
    decks: [
      {
        id: "1",
        name: "One",
        description: "This is the deck one",
        front: "en",
        back: "pt",
        creationTime: Date.now(),
        updateTime: Date.now()
      },
      {
        id: "2",
        name: "Two",
        description: "This is the deck two",
        front: "pt",
        back: "en",
        creationTime: Date.now(),
        updateTime: Date.now()
      }
    ],
    cards: [
      {
        id: "1",
        deck: "1",
        front: "Hello",
        back: "Olá",
        maturity: 0,
        lastStudyTime: Date.now(),
        creationTime: Date.now(),
        updateTime: Date.now()
      },
      {
        id: "2",
        deck: "1",
        front: "Hi",
        back: "Oi",
        maturity: 0,
        lastStudyTime: Date.now(),
        creationTime: Date.now(),
        updateTime: Date.now()
      },
      {
        id: "3",
        deck: "2",
        front: "Bem vindo",
        back: "Welcome",
        maturity: 0,
        lastStudyTime: Date.now(),
        creationTime: Date.now(),
        updateTime: Date.now()
      }
    ]
  },
  applyMiddleware(reduxThunk)
);

const Root = () => {
  return (
    <Provider store={store}>
      <UiWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/decks" exact component={Decks} />
            <Route path="/decks/:deckId" exact component={Deck} />
            <Route path="/cards" exact component={Cards} />
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </UiWrapper>
    </Provider>
  );
};

export default Root;
