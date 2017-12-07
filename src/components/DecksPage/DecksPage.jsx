import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { decksSelectors } from "../../decks";
import styles from "./DecksPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Deck from "../Deck";

const DecksPage = ({ decks }) => {
  const renderState = () => {
    if (decksSelectors.isLoaded(decks)) {
      return <LoadedState decks={decks} />;
    } else {
      return <LoadingState />;
    }
  };

  return (
    <div>
      <Navbar
        title="My decks"
        actions={[
          {
            icon: "fa fa-plus",
            text: "Create deck",
            type: "tertiary",
            tag: Link,
            to: "/decks/create"
          }
        ]}
      />
      <Container>{renderState()}</Container>
    </div>
  );
};

DecksPage.propTypes = {
  decks: PropTypes.object.isRequired
};

const LoadedState = ({ decks }) => {
  return (
    <div className={styles.decks}>
      {decks.items
        .toArray()
        .map((deck, index) => <DeckWrapper key={index} deck={deck} />)}
    </div>
  );
};

LoadedState.propTypes = {
  decks: PropTypes.object.isRequired
};

const LoadingState = () => {
  return <div>Loading decks...</div>;
};

const DeckWrapper = ({ deck }) => {
  const menuModel = [
    {
      icon: "fa fa-sticky-note-o",
      text: "Manage cards",
      tag: Link,
      to: `decks/${deck.id}/cards`
    },
    { separator: true },
    {
      icon: "fa fa-pencil",
      text: "Edit",
      tag: Link,
      to: `decks/${deck.id}/edit`
    },
    {
      icon: "fa fa-trash-o",
      text: "Delete",
      danger: true,
      tag: Link,
      to: `decks/${deck.id}/delete`
    }
  ];

  const actionsModel = [
    { text: "Study", primary: true, tag: Link, to: `study/${deck.id}` },
    {
      text: "Add card",
      secondary: true,
      tag: Link,
      to: `decks/${deck.id}/cards/create`
    }
  ];

  return (
    <div className={styles.deckWrapper}>
      <Deck
        model={deck}
        className={styles.deck}
        menuModel={menuModel}
        actionsModel={actionsModel}
      />
    </div>
  );
};

DeckWrapper.propTypes = {
  deck: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(DecksPage);
