import React from "react";
import PropTypes from "prop-types";
import { DeckModel } from "../../decks";
import classnames from "classnames";
import styles from "./Deck.m.css";
import ActionModel from "./ActionModel";
import Button from "../Button";
import { DropdownMoreVertButton } from "../Dropdown";
import DropdownMenu from "../DropdownMenu";

const Deck = ({ deck, className, actions, options, ...rest }) => {

  const renderAction = (action, index) => {
    const Tag = action.tag;
    return <Tag key={index} {...action.params}>{action.label}</Tag>;
  };

  const renderActions = () => {
    return actions.map(renderAction);
  };

  return (
    <div {...rest} className={classnames(styles.deck, className)}>
      <div className={styles.deckMenu}>
        { options ? renderOptions(options) : null }
      </div>
      <div className={styles.deckContent}>
        <h1>{deck.name}</h1>
        <div className={styles.labels}>
          <label>{deck.front ? deck.front : "Front"}</label>
          <label>{deck.back ? deck.back : "Back"}</label>
        </div>
        <h2>{deck.description}</h2>
        <div>
          { renderActions() }
        </div>
      </div>
    </div>
  );

};

const renderOptions = (options, ...params) => {
  return (
    <DropdownMenu {...params} side="right" items={options}
      buttonChildren={<DropdownMoreVertButton />}
    /> 
  );
};

Deck.propTypes = {
  deck: PropTypes.objectOf(DeckModel).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  actions: PropTypes.arrayOf(ActionModel),
  options: PropTypes.arrayOf(PropTypes.object),
};

export default Deck;
