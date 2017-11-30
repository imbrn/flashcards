import React from "react";
import { Map } from "immutable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./DecksContent.m.css";
import Deck, { ActionModel, OptionModel } from "../Deck";
import Button from "../Button";

const DecksContent = ({ decks }) => {
  return (
    <div className={styles.decks}>
      { decks.toArray().map(renderDeck) }
    </div>
  );
};

const renderDeck = (deck) => {
  const actions = [
    ActionModel({ tag: Button, label: "Study", color: "primary", size: "xl" }),
    ActionModel({ tag: Button, label: "Add card", color: "secondary", size: "xl" }),
  ];
  const options = [
    OptionModel.item({ icon: "fa fa-sticky-note-o", text: "Manage cards" }),
    OptionModel.separator(),
    OptionModel.item({ icon: "fa fa-edit", text: "Edit" }),
    OptionModel.item({ icon: "fa fa-trash-o", text: "Delete", color: "danger" }),
  ];
  return (
    <div key={deck.id} className={styles.deckWrapper}>
      <Deck deck={deck} actions={actions} options={options} />
    </div>
  );
};

DecksContent.propTypes = {
  decks: PropTypes.objectOf(Map).isRequired,
};

const mapStateToProps = (state) => ({
  decks: state.decks,
});

export default connect(mapStateToProps)(DecksContent);
