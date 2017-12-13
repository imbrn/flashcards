import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { decksSelectors } from "../../decks";
import styles from "./EditDeckPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import DeckForm from "../DeckForm";

const EditDeckPage = ({ match, decks }) => {
  const renderContent = () => {
    if (decksSelectors.isLoaded(decks)) {
      const deck = decks.items.get(match.params.deckId);
      return <EditContent deck={deck} />;
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
  match: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const EditContent = ({ deck }) => {
  return (
    <div className={styles.editContent}>
      <DeckForm defaultValue={deck} className={styles.deckForm} />
    </div>
  );
};

EditContent.propTypes = {
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
