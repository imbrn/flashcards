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
  const onSubmit = data => {
    dispatch(decksOperations.createDeck(data));
    history.push("/");
  };

  const onCancel = () => {
    history.push("/");
  };

  return (
    <div className={styles.root}>
      <Navbar title="Create deck" />
      <Container className={styles.container}>
        <div className={styles.createDeckContent}>
          <Box elevation={2} className={styles.createDeckBox}>
            <DeckForm
              className={styles.deckForm}
              onSubmit={onSubmit}
              onCancel={onCancel}
              confirmText="Create"
            />
          </Box>
        </div>
      </Container>
    </div>
  );
};

CreateDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default connect()(CreateDeckPage);
