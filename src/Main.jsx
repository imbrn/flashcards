import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "firebase/firestore";
import { auth, firestore, initializeApp } from "firebase";
import firebaseConfig from "../firebase/config.js";
import { connect } from "react-redux";
import { authOperations, authSelectors } from "./auth";
import { decksOperations, CardModel, DeckModel } from "./decks";
import LoadingPage from "./components/LoadingPage";
import AuthFailPage from "./components/AuthFailPage";
import MainPage from "./components/MainPage";

class Main extends React.Component {

  componentWillMount() {
    initializeApp(firebaseConfig);

    // Authentication
    this.dispatch(authOperations.startSigningIn());
    auth().onAuthStateChanged(user => {
      if (user) {
        this.onSignIn(user);
      } else {
        this.onSignOut();
      }
    });

    auth().signInAnonymously().catch(error => {
      this.dispatch(authOperations.signInFailed(error));
    });
  }

  onSignIn(user) {
    this.dispatch(authOperations.signIn(user));
    this.cardsListeners = {};
    this.listenToDecks(user);
  }

  onSignOut() {
    this.dispatch(authOperations.signOut());
    this.stopListeningToDecks();
    this.cardsListeners = {};
  }

  listenToDecks(user) {
    this.stopListeningToDecks = firestore()
      .collection("users").doc(user.uid)
      .collection("decks").onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          if (change.type === "added") this.addDeck(change.doc);
          if (change.type === "removed") this.removeDeck(change.doc);
          if (change.type === "modified") this.updateDeck(change.doc);
        });
      });
  }

  addDeck(doc) {
    this.dispatch(decksOperations.addDeck(this.parseDeck(doc)));
    this.cardsListeners[doc.id] = this.listenToCards(doc);
  }

  removeDeck(doc) {
    this.dispatch(decksOperations.removeDeck(this.parseDeck(doc)));
    this.cardsListeners[doc.id]();
    delete this.cardsListeners[doc.id];
  }

  updateDeck(doc) {
    this.dispatch(decksOperations.updateDeck(this.parseDeck(doc)));
  }

  listenToCards(deckDoc) {
    deckDoc.ref.collection("cards").onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === "added") this.addCard(deckDoc, change.doc);
        if (change.type === "removed") this.removeCard(deckDoc, change.doc);
        if (change.type === "modified") this.updateCard(deckDoc, change.doc);
      });
    });
  }

  addCard(deckDoc, cardDoc) {
    this.dispatch(decksOperations.addCard(this.parseCard(deckDoc, cardDoc)));
  }

  removeCard(deckDoc, cardDoc) {
    this.dispatch(decksOperations.removeCard(this.parseCard(deckDoc, cardDoc)));
  }

  updateCard(deckDoc, cardDoc) {
    this.dispatch(decksOperations.updateCard(this.parseCard(deckDoc, cardDoc)));
  }

  parseCard(deckDoc, cardDoc) {
    const deck = this.parseDeck(deckDoc);
    return CardModel({
      ...cardDoc.data(),
      id: cardDoc.id,
      deck,
    });
  }

  parseDeck(deckDoc) {
    return DeckModel({
      ...deckDoc.data(),
      id: deckDoc.id,
    });
  }

  dispatch(action) {
    this.props.dispatch(action);
  }

  componentWillUnmount() {
    if (this.stopListeningToDecks) this.stopListeningToDecks();
  }

  render() {
    if (authSelectors.isSigningIn(this.props.auth)) {
      return <LoadingPage />;
    } else if (authSelectors.isSignedIn(this.props.auth)) {
      return <MainPage />;
    } else {
      return <AuthFailPage />;
    }
  }

}

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps)(Main));
