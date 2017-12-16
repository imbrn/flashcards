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

const DeleteDeckPage = ({ decks, dispatch, match, history }) => {
  const loaded = decksSelectors.isLoaded(decks);

  return (
    <div className={styles.root}>
      <Navbar title={loaded ? "Delete deck" : ""} />
      <Container className={styles.container}>
        {loaded ? (
          <DeletingDeckContent
            decks={decks}
            dispatch={dispatch}
            match={match}
            history={history}
          />
        ) : (
          <LoadingDecksProgressContent />
        )}
      </Container>
    </div>
  );
};

DeleteDeckPage.propTypes = {
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const DeletingDeckContent = ({ decks, dispatch, match, history }) => {
  const deck = decks.items.get(match.params.deckId);

  if (decksSelectors.isDeletingDeck(decks)) {
    return <DeletingDeckProgressContent />;
  } else if (deck) {
    return (
      <DeleteDeckContent deck={deck} dispatch={dispatch} history={history} />
    );
  } else {
    // This is needed for the transaction between pages to be done without
    // errors.
    return null;
  }
};

DeletingDeckContent.propTypes = {
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const DeletingDeckProgressContent = () => {
  return (
    <div className={styles.deletingDeckProgressContent}>
      <Text bold size="lg">
        Deleting deck...
      </Text>
    </div>
  );
};

const DeleteDeckContent = ({ deck, dispatch, history }) => {
  const onConfirm = () => {
    dispatch(decksOperations.requestDeleteDeck(deck)).then(() => {
      history.goBack();
    });
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <div className={styles.deleteDeckContent}>
      <Title size="sm" color="danger" className={styles.title}>
        Are you sure you want to delete this deck?
      </Title>

      <div className={styles.deckWrapper}>
        <Deck model={deck} className={styles.deck} />
      </div>

      <div className={styles.info}>
        <Text>
          <b>{deck.cards.size} cards</b> will be lost.
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
  );
};

DeleteDeckContent.propTypes = {
  deck: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const LoadingDecksProgressContent = () => {
  return (
    <div className={styles.loadingDecksProgressContent}>
      <Text bold size="lg">
        Loading data...
      </Text>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};
export default connect(mapStateToProps)(DeleteDeckPage);
