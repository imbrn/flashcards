import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { decksOperations } from "../../decks";
import styles from "./DeleteDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Title from "../Title";
import Deck from "../Deck";
import Text from "../Text";
import Button from "../Button";

const DeleteDeckPage = ({ decks, cards, dispatch, match, history }) => {
  if (decks.isEmpty()) return null;

  const deckId = match.params.deckId;
  const deck = decks.get(deckId);
  const deckCards = cards.filter(card => card.deckId === deckId);

  // There's no deck for the specified ID
  if (!deck) {
    return <Redirect to="/page-not-found" />;
  }

  const onConfirm = () => {
    dispatch(decksOperations.deleteDeck(deckId));
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <div className={styles.root}>
      <Navbar title="Deleting deck" />
      <Container className={styles.container}>
        <div className={styles.deleteDeckContent}>
          <Title size="sm" color="danger" className={styles.title}>
            Are you sure you want to delete this deck?
          </Title>

          <div className={styles.deckWrapper}>
            <Deck model={deck} className={styles.deck} />
          </div>

          <div className={styles.info}>
            <Text>
              <b>{deckCards.size} cards</b> will be lost.
            </Text>
            <Text>This operation is irreversible.</Text>
          </div>

          <div className={styles.buttons}>
            <Button
              size="lg"
              color="danger"
              highlighted
              onClick={onConfirm}
              className={styles.button}
            >
              Delete
            </Button>
            <Button size="lg" onClick={onCancel} className={styles.button}>
              Cancel
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

DeleteDeckPage.propTypes = {
  decks: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    decks: state.decks,
    cards: state.cards
  };
};
export default connect(mapStateToProps)(DeleteDeckPage);
