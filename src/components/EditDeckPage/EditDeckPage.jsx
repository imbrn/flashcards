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
      return (
        <EditContent
          dispatch={dispatch}
          history={history}
          decks={decks}
          deck={deck}
        />
      );
    } else {
      return <LoadingContent />;
    }
  };

  return (
    <div className={styles.root}>
      <Navbar title="Edit deck" />
      <Container className={styles.container}>{renderContent()}</Container>
    </div>
  );
};

EditDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const EditContent = ({ dispatch, history, decks, deck }) => {
  const onSubmit = deckData => {
    // Redirects to the main page when finished the updating
    dispatch(decksOperations.requestEditDeck(deck.merge(deckData))).then(() => {
      history.push("/");
    });
  };

  const onCancel = () => {
    history.goBack();
  };

  const renderContent = () => {
    if (decksSelectors.isEditingDeck(decks)) {
      return <EditingProgress />;
    } else {
      return (
        <FormContent deck={deck} onSubmit={onSubmit} onCancel={onCancel} />
      );
    }
  };

  return <div className={styles.editContent}>{renderContent()}</div>;
};

EditContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired
};

const EditingProgress = () => {
  return <div className={styles.editingProgress}>Saving changes...</div>;
};

const FormContent = ({ deck, onSubmit, onCancel }) => {
  return (
    <div className={styles.formContent}>
      <Box elevation={2} className={styles.formBox}>
        <DeckForm
          className={styles.form}
          defaultValue={deck}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Box>
    </div>
  );
};

FormContent.propTypes = {
  deck: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const LoadingContent = () => {
  return <div className={styles.loadingContent}>Loading deck...</div>;
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(EditDeckPage);
