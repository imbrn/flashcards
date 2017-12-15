import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateDeckPage.css";
import { connect } from "react-redux";
import { decksOperations, decksSelectors } from "../../decks";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Box from "../Box";
import DeckForm from "../DeckForm";
import Text from "../Text";

const CreateDeckPage = ({ dispatch, history, decks }) => {
  const loaded = decksSelectors.isLoaded(decks);

  return (
    <div className={styles.root}>
      <NavbarContent loaded={loaded} />
      <MainContent
        loaded={loaded}
        decks={decks}
        dispatch={dispatch}
        history={history}
      />
    </div>
  );
};

CreateDeckPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  decks: PropTypes.object.isRequired
};

const NavbarContent = ({ loaded }) => {
  return <Navbar title={loaded ? "New deck" : ""} />;
};

NavbarContent.propTypes = {
  loaded: PropTypes.bool.isRequired
};

const MainContent = ({ loaded, decks, dispatch, history }) => {
  return (
    <Container className={styles.mainContent}>
      {loaded ? (
        <CreatingDeckContent
          decks={decks}
          dispatch={dispatch}
          history={history}
        />
      ) : (
        <LoadingDecksProgressContent />
      )}
    </Container>
  );
};

MainContent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const CreatingDeckContent = ({ decks, dispatch, history }) => {
  const creating = decksSelectors.isCreatingDeck(decks);

  return (
    <div className={styles.creatingDeckContent}>
      {creating ? (
        <CreatingDeckProgressContent />
      ) : (
        <CreateDeckFormContent dispatch={dispatch} history={history} />
      )}
    </div>
  );
};

CreatingDeckContent.propTypes = {
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const CreatingDeckProgressContent = () => {
  return (
    <div className={styles.creatingDeckProgressContent}>
      <Text bold color="secondary" size="lg">
        Creating deck...
      </Text>
    </div>
  );
};

const CreateDeckFormContent = ({ dispatch, history }) => {
  const onSubmit = data => {
    dispatch(decksOperations.requestCreateDeck(data)).then(deck => {
      history.push(`/decks/${deck.id}/cards`);
    });
  };

  const onCancel = () => {
    history.push("/");
  };

  return (
    <div className={styles.createDeckFormContent}>
      <Box elevation={2} className={styles.creatingDeckBox}>
        <DeckForm
          className={styles.deckForm}
          onSubmit={onSubmit}
          onCancel={onCancel}
          confirmText="Create"
        />
      </Box>
    </div>
  );
};

CreateDeckFormContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const LoadingDecksProgressContent = () => {
  return (
    <div className={styles.loadingDecksProgressContent}>
      <Text size="lg" bold>
        Loading decks...
      </Text>
    </div>
  );
};

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(CreateDeckPage);
