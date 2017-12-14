import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateDeckPage.css";
import { connect } from "react-redux";
import { decksOperations, decksSelectors } from "../../decks";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import DeckForm from "../DeckForm";

const CreateDeckPage = ({ dispatch, history, decks }) => {
  const onSubmit = deckData => {
    dispatch(decksOperations.requestCreateDeck(deckData)).then(deck => {
      // Go to the newly created deck cards page
      history.push(`/decks/${deck.id}/cards`);
    });
  };

  const onCancel = () => {
    history.goBack();
  };

  const renderBoxContent = () => {
    if (decksSelectors.isCreatingDeck(decks)) {
      return <CreatingDeckProgress />;
    } else {
      return <CreateFormContent onSubmit={onSubmit} onCancel={onCancel} />;
    }
  };

  return (
    <div>
      <Navbar title="New deck" />
      <Container className={styles.content}>{renderBoxContent()}</Container>
    </div>
  );
};

CreateDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const CreatingDeckProgress = () => {
  return <span>Creating deck...</span>;
};

const CreateFormContent = ({ onSubmit, onCancel }) => {
  return (
    <Box elevation={2} className={styles.box}>
      <DeckForm
        className={styles.deckForm}
        onSubmit={onSubmit}
        onCancel={onCancel}
        confirmText="Create"
      />
    </Box>
  );
};

CreateFormContent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(CreateDeckPage);
