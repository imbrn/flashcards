import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Main from "./components/Main";
import services from "./services";
import { userOperations } from "./user";
import { decksOperations } from "./decks";
import { cardsOperations } from "./cards";

class App extends React.Component {
  componentWillMount() {
    services.initialize();

    // Initial sign in
    services.auth.initialSignIn().then(user => {
      this.dispatch(userOperations.signIn(user));
      this.loadData();
    });
  }

  loadData() {
    // Listen to decks
    this.stopListeningDecks = services.decks.listen(decks => {
      this.dispatch(decksOperations.updateDecks(decks));
    });

    // and cards.
    this.stopListeningCards = services.cards.listen(cards => {
      this.dispatch(cardsOperations.updateCards(cards));
    });
  }

  dispatch(action) {
    this.props.dispatch(action);
  }

  render() {
    return <Main />;
  }

  componentWillUnmount() {
    this.stopListeningCards();
    this.stopListeningDecks();
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect()(App));
