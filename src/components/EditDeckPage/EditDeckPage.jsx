import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { decksOperations } from "../../decks";
import styles from "./EditDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import DeckForm from "../DeckForm";

const EditDeckPage = ({ dispatch, match, history, decks }) => {
  if (decks.isEmpty()) return null;

  const deckId = match.params.deckId;
  const deck = decks.get(deckId);

  if (!deck) {
    return <Redirect to="/page-not-found" />;
  }

  const onSubmit = data => {
    dispatch(decksOperations.updateDeck(deckId, data));
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <div className={styles.root}>
      <Navbar title="Edit deck" />
      <Container className={styles.container}>
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
      </Container>
    </div>
  );
};

EditDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(EditDeckPage);
