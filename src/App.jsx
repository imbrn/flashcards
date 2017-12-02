import React from "react";
import PropTypes from "prop-types";
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

    services.initialSignIn().then(user => {
      this.dispatch(authOperations.endSigningIn(user));
      this.loadDecks(user);
    }).catch(error => {
      this.dispatch(authOperations.signingInFailed(error));
    });
  }

  loadDecks(user) {
    this.dispatch(decksOperations.startLoadingInitialDecks());

    user.getDecks().then(this.convertDecksProxiesToModels).then(decks => {
      this.dispatch(decksOperations.loadInitialDecks(decks));
    });
  }

  convertDecksProxiesToModels(decks) {
    return Promise.all(decks.map(deck => deck.asDeepDeckModel()));
  }

  dispatch(action) {
    this.props.dispatch(action);
  }

  render() {
    return <Main />;
  }

}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
