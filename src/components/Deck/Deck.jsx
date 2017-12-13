import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Deck.css";
import Box from "../Box";
import Title from "../Title";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Icon from "../Icon";

const Deck = ({ model, menuModel, actionsModel, className, ...rest }) => {
  const description = model.description
    ? model.description
    : "There's no description for this deck.";
  const descriptionClass = !model.description ? styles.noDescription : null;

  const front = model.front ? model.front : "Front";
  const back = model.back ? model.back : "Back";

  return (
    <Box
      {...rest}
      room="big"
      elevation={2}
      className={classnames(styles.deck, className)}
    >
      {menuModel ? <Menu model={menuModel} /> : null}
      <div className={styles.content}>
        <Title>{model.name}</Title>
        <div className={styles.labels}>
          <span className={styles.label}>{front}</span>
          <span className={styles.label}>{back}</span>
        </div>
        <p className={descriptionClass}>{description}</p>
        {actionsModel ? <Actions model={actionsModel} /> : null}
      </div>
    </Box>
  );
};

Deck.propTypes = {
  model: PropTypes.object.isRequired,
  menuModel: PropTypes.arrayOf(PropTypes.object),
  actionsModel: PropTypes.arrayOf(PropTypes.object),
  className: PropTypesUtils.className
};

const Menu = ({ model }) => {
  return (
    <div className={styles.menu}>
      <Dropdown actions={model} side="right" />
    </div>
  );
};

Menu.propTypes = {
  model: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Actions = ({ model, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.actions, className)}>
      {model.map((actionModel, index) => (
        <Action key={index} model={actionModel} />
      ))}
    </div>
  );
};

Actions.propTypes = {
  model: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypesUtils.className
};

const Action = ({ model, ...rest }) => {
  const {
    icon,
    text,
    className,
    primary,
    secondary,
    tertiary,
    ...params
  } = model;

  const classes = [
    styles.action,
    tertiary ? styles.tertiaryAction : null,
    secondary ? styles.secondaryAction : null,
    primary ? styles.primaryAction : null,
    className
  ];

  return (
    <Button {...rest} {...params} className={classnames(classes)}>
      {icon ? <Icon icon={icon} /> : null}
      {text ? text : null}
    </Button>
  );
};

Action.propTypes = {
  model: PropTypes.object.isRequired
};

export default Deck;
