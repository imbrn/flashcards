import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { decksSelectors } from "../../decks";
import styles from "./CardsPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Card from "../Card";

const CardsPage = ({ match, decks }) => {
  const loaded = decksSelectors.isLoaded(decks);

  let deck;
  if (loaded) {
    deck = decks.items.get(match.params.deckId);
  }

  return <Root loaded={loaded} deck={deck} />;
};

CardsPage.propTypes = {
  match: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const Root = ({ loaded, deck }) => {
  const pageActions = [
    { icon: "fa fa-plus", text: "Add card", color: "tertiary" }
  ];

  return (
    <div className={styles.root}>
      <Navbar
        title={loaded ? deck.name : ""}
        actions={loaded ? pageActions : null}
      />
      <Container>
        {loaded ? <LoadedContent deck={deck} /> : <LoadingContent />}
      </Container>
    </div>
  );
};

Root.propTypes = {
  loaded: PropTypes.bool.isRequired,
  deck: PropTypes.object
};

const LoadedContent = ({ deck }) => {
  const renderCard = card => {
    const menuModel = [
      {
        icon: "fa fa-pencil",
        text: "Edit",
        tag: Link,
        to: `/decks/${deck.id}/cards/edit`
      },
      {
        icon: "fa fa-trash-o",
        text: "Delete",
        color: "danger",
        tag: Link,
        to: `/decks/${deck.id}/cards/delete`
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
      <div className={styles.cards}>{deck.cards.toArray().map(renderCard)}</div>
    </div>
  );
};

LoadedContent.propTypes = {
  deck: PropTypes.object.isRequired
};

const LoadingContent = () => {
  return <div className={styles.LoadingContent}>Loading cards...</div>;
};

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(CardsPage);
