import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { decksSelectors } from "../../decks";
import styles from "./CardsPage.css";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";

const CardsPage = ({ match, decks }) => {
  const loaded = decksSelectors.isLoaded(decks);

  let deck;
  if (loaded) {
    deck = decks.items.get(match.params.deckId);
  }

  return <Root loaded={loaded} deck={deck} />;
};

CardsPage.propTypes = {
  match: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired
};

const Root = ({ loaded, deck }) => {
  return (
    <div className={styles.root}>
      <Navbar title={loaded ? deck.name : ""} />
      <Container>
        {loaded ? <LoadedContent deck={deck} /> : <LoadingContent />}
      </Container>
    </div>
  );
};

Root.propTypes = {
  loaded: PropTypes.bool.isRequired,
  deck: PropTypes.object
};

const LoadedContent = ({ deck }) => {
  return <div className={styles.contentPage}>{deck.name}</div>;
};

LoadedContent.propTypes = {
  deck: PropTypes.object.isRequired
};

const LoadingContent = () => {
  return <div className={styles.LoadingContent}>Loading cards...</div>;
};

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(CardsPage);
