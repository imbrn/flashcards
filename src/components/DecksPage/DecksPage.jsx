import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./DecksPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Deck from "../Deck";

const DecksPage = ({ decks }) => {
  return (
    <div className={styles.root}>
      <Navbar
        title="My decks"
        actions={[
          {
            icon: "fa fa-plus",
            text: "Create deck",
            color: "tertiary",
            tag: Link,
            to: "/decks/create"
          }
        ]}
      />
      <Container>
        <div className={styles.decks}>
          {decks
            .sort(creationTimeSort)
            .toArray()
            .map((deck, index) => <DeckWrapper key={index} deck={deck} />)}
        </div>
      </Container>
    </div>
  );
};

DecksPage.propTypes = {
  decks: PropTypes.object.isRequired
};

function creationTimeSort(a, b) {
  if (!a.createTime) {
    return 1;
  } else if (!b.createTime) {
    return -1;
  }
  return a.createTime - b.createTime;
}

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
      color: "danger",
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
      to: `decks/${deck.id}/cards/add`
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
