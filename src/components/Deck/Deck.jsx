import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Deck.css";
import { DeckModel } from "../../decks";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Icon from "../Icon";

const Deck = ({ model, menuModel, actionsModel, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.deck, className)}>
      { menuModel ? <Menu model={menuModel} /> : null }
      <div className={styles.content}>
        <h1>{model.name}</h1>
        <div className={styles.labels}>
          <span className={styles.label}>{model.front}</span>
          <span className={styles.label}>{model.back}</span>
        </div>
        <p>{model.description}</p>
        { actionsModel ? <Actions model={actionsModel} /> : null }
      </div>
    </div>
  );
};

Deck.propTypes = {
  model: PropTypes.objectOf(DeckModel).isRequired,
  menuModel: PropTypes.arrayOf(PropTypes.object),
  actionsModel: PropTypes.arrayOf(PropTypes.object),
  className: PropTypesUtils.className,
};

const Menu = ({ model }) => {
  return (
    <div className={styles.menu}>
      <Dropdown actions={model} side="right" />
    </div>
  );
};

Menu.propTypes = {
  model: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Actions = ({ model, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.actions, className)}>
      { model.map((actionModel, index) => <Action key={index} model={actionModel} />) }
    </div>
  );
};

Actions.propTypes = {
  model: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypesUtils.className,
};

const Action = ({ model, ...rest }) => {
  const { tag = Button, icon, text, className, primary, secondary, tertiary, ...params } = model;
  const Tag = tag;

  const classes = [
    styles.action,
    tertiary ? styles.tertiaryAction: null,
    secondary ? styles.secondaryAction : null,
    primary ? styles.primaryAction : null,
    className,
  ];

  return (
    <Tag {...rest} {...params} className={classnames(classes)}>
      { icon ? <Icon icon={icon} /> : null }
      { text ? text : null }
    </Tag>
  );
};

Action.propTypes = {
  model: PropTypes.object.isRequired,
};

export default Deck;
