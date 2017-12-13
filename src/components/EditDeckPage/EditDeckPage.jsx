import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { decksSelectors, decksOperations } from "../../decks";
import styles from "./EditDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import DeckForm from "../DeckForm";

const EditDeckPage = ({ dispatch, match, history, decks }) => {
  const renderContent = () => {
    if (decksSelectors.isLoaded(decks)) {
      const deck = decks.items.get(match.params.deckId);
      return <EditContent dispatch={dispatch} deck={deck} history={history} />;
    } else {
      return <LoadingContent />;
    }
  };

  return (
    <div className={styles.root}>
      <Navbar title="Edit deck" />
      <Container className={styles.contentRoot}>{renderContent()}</Container>
    </div>
  );
};

EditDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const EditContent = ({ dispatch, history, deck }) => {
  const onSubmit = deckData => {
    dispatch(decksOperations.requestEditDeck(deck.merge(deckData)));
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <Box elevation={2} className={styles.editContent}>
      <DeckForm
        className={styles.deckForm}
        defaultValue={deck}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Box>
  );
};

EditContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired
};

const LoadingContent = () => {
  return <div className={styles.loadingContent}>Loading</div>;
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(EditDeckPage);
