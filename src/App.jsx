import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Main from "./components/Main";
import services from "./services";
import { authOperations } from "./auth";
import { decksOperations } from "./decks";

class App extends React.Component {
  componentWillMount() {
    services.initialize();

    // Initial sign in
    this.dispatch(authOperations.startSigningIn());

    services
      .initialSignIn()
      .then(user => {
        this.dispatch(authOperations.endSigningIn(user));
        this.loadDecks(user);
      })
      .catch(error => {
        this.dispatch(authOperations.signingInFailed(error));
      });
  }

  componentWillUnmount() {
    this.stopListeningDecks();
  }

  loadDecks(user) {
    this.dispatch(decksOperations.startLoadingInitialDecks());

    const userDecks = user.getDecks();

    userDecks
      .getAll()
      .then(this.convertDecksProxiesToModels)
      .then(decksModels => {
        this.dispatch(decksOperations.loadInitialDecks(decksModels));
        this.startListeningDecks(userDecks);
      });
  }

  convertDecksProxiesToModels(decks) {
    return Promise.all(decks.map(deck => deck.asDeepDeckModel()));
  }

  startListeningDecks(decks) {
    this.stopListeningDecks = decks.listen({
      onAddDeck: deck => this.dispatch(decksOperations.addDeck(deck)),
      onRemoveDeck: deck => this.dispatch(decksOperations.removeDeck(deck)),
      onUpdateDeck: deck => this.dispatch(decksOperations.updateDeck(deck)),
      onAddCard: card => this.dispatch(decksOperations.addCard(card)),
      onRemoveCard: card => this.dispatch(decksOperations.removeCard(card)),
      onUpdateCard: card => this.dispatch(decksOperations.updateCard(card))
    });
  }

  dispatch(action) {
    this.props.dispatch(action);
  }

  render() {
    return <Main />;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect()(App));
