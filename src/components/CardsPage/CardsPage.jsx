import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./CardsPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Card from "../Card";

const CardsPage = ({ match, decks, cards }) => {
  if (decks.isEmpty()) return null;

  const deckId = match.params.deckId;
  const deck = decks.get(deckId);
  const deckCards = cards.filter(card => card.deckId === deckId).toArray();

  if (!deck) {
    return <Redirect to="/page-not-found" />;
  }

  const pageActions = [
    {
      icon: "fa fa-plus",
      text: "Add card",
      color: "tertiary",
      tag: Link,
      to: `/decks/${deckId}/cards/add`
    }
  ];

  return (
    <div className={styles.root}>
      <Navbar title={deck.name} actions={pageActions} />
      <Container>
        <Content deck={deck} cards={deckCards} />
      </Container>
    </div>
  );
};

CardsPage.propTypes = {
  match: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired
};

const Content = ({ deck, cards }) => {
  const renderCard = card => {
    const menuModel = [
      {
        icon: "fa fa-pencil",
        text: "Edit",
        tag: Link,
        to: `/decks/${deck.id}/cards/${card.id}/edit`
      },
      {
        icon: "fa fa-trash-o",
        text: "Delete",
        color: "danger",
        tag: Link,
        to: `/decks/${deck.id}/cards/${card.id}/delete`
      }
    ];

    return (
      <div key={card.id} className={styles.cardWrapper}>
        <Card model={card} menuModel={menuModel} className={styles.card} />
      </div>
    );
  };

  return (
    <div className={styles.contentPage}>
      <div className={styles.cards}>{cards.map(renderCard)}</div>
    </div>
  );
};

Content.propTypes = {
  deck: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  decks: state.decks,
  cards: state.cards
});

export default connect(mapStateToProps)(CardsPage);
