import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { decksSelectors } from "../../decks";
import Navbar from "../Navbar";
import Container from "../ResponsiveContainer";
import Deck from "../Deck";

const DecksPage = ({ decks }) => {

  const renderState = () => {
    if (decksSelectors.isLoaded(decks)) {
      return renderLoadedState();
    } else {
      return renderLoadingState();
    }
  };

  const renderLoadingState = () => {
    return (
      <div>
        Loading
      </div>
    );
  };

  const renderLoadedState = () => {
    return (
      <div>
        { decks.items.toArray().map(renderDeck) }
      </div>
    );
  };

  const renderDeck = (deck) => {
    return <Deck key={deck.id} model={deck} />;
  };

  return (
    <div>
      <Navbar title="My decks" actions={[
        { icon: "fa fa-search", text: "Search", tertiary: true },
        { icon: "fa fa-plus", text: "Create deck", tertiary: true, tag: Link, to: "/decks/create" },
      ]} />
      <Container>
        { renderState() }
      </Container>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    decks: state.decks,
  };
};

export default connect(mapStateToProps)(DecksPage);
