import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { decksOperations, decksSelectors } from "../../decks";
import styles from "./DeleteDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Title from "../Title";
import Deck from "../Deck";
import Text from "../Text";
import Button from "../Button";

const DeleteDeckPage = ({ dispatch, decks, match, history }) => {
  const onConfirmDeletion = deck => {
    dispatch(decksOperations.requestDeleteDeck(deck));
    history.goBack();
  };

  const onCancelDeletion = () => {
    history.goBack();
  };

  const renderContent = () => {
    if (decksSelectors.isLoaded(decks)) {
      const deck = decks.items.get(match.params.deckId);

      return (
        <DeleteDeckContent
          deck={deck}
          onConfirm={() => onConfirmDeletion(deck)}
          onCancel={onCancelDeletion}
        />
      );
    } else {
      return <LoadingDecks />;
    }
  };

  return (
    <div className={styles.root}>
      <Navbar title="Delete deck" />
      {renderContent()}
    </div>
  );
};

DeleteDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  decks: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const LoadingDecks = () => {
  return <Container>Loading deck...</Container>;
};

const DeleteDeckContent = ({ deck, onConfirm, onCancel }) => {
  return (
    <Container className={styles.content}>
      <Title size="md" color="danger" className={styles.title}>
        Are you sure you want to delete this deck?
      </Title>

      <div className={styles.deckContainer}>
        <Deck model={deck} className={styles.deck} />
      </div>

      <div className={styles.info}>
        <Text>This operation is irreversible.</Text>
        <Text>All of its cards will be lost.</Text>
      </div>

      <div className={styles.buttons}>
        <Button size="big" color="danger" highlighted onClick={onConfirm}>
          Delete
        </Button>
        <Button size="big" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};

DeleteDeckContent.propTypes = {
  deck: PropTypes.object.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(DeleteDeckPage);
