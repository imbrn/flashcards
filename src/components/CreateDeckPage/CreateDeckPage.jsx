import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateDeckPage.css";
import { connect } from "react-redux";
import { decksOperations } from "../../decks";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import DeckForm from "../DeckForm";

const CreateDeckPage = ({ dispatch, history }) => {
  const onSubmit = deckData => {
    dispatch(decksOperations.requestCreateDeck(deckData));
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <Navbar title="New deck" />
      <Container className={styles.content}>
        <Box elevation={2} className={styles.form}>
          <DeckForm
            className={styles.deckForm}
            onSubmit={onSubmit}
            onCancel={onCancel}
            confirmText="Create"
          />
        </Box>
      </Container>
    </div>
  );
};

CreateDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect()(CreateDeckPage);
