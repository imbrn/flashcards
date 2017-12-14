import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Card.css";
import Box from "../Box";
import Dropdown from "../Dropdown";
import Title from "../Title";
import Text from "../Text";

const Card = ({ model, className, menuModel, ...rest }) => {
  return (
    <Box {...rest} elevation={2} className={classnames(styles.card, className)}>
      <Menu model={menuModel} />
      <div className={styles.cardContent}>
        <Title size="md" className={styles.cardFront}>
          {model.front}
        </Title>
        <Text className={styles.cardBack}>{model.back}</Text>
      </div>
    </Box>
  );
};

Card.propTypes = {
  model: PropTypes.object.isRequired,
  className: PropTypesUtils.className,
  menuModel: PropTypes.arrayOf(PropTypes.object)
};

const Menu = ({ model }) => {
  if (model) {
    return <Dropdown actions={model} side="right" className={styles.menu} />;
  } else {
    return null;
  }
};

Menu.propTypes = {
  model: PropTypes.arrayOf(PropTypes.object)
};

export default Card;
