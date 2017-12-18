import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils.js";
import classnames from "classnames";
import styles from "./Icon.css";

const Icon = ({ icon, color="normal", className, ...rest }) => {
  const modifiersClasses = classnames(
    styles[color]
  );
  return (
    <span {...rest} className={classnames(styles.icon, modifiersClasses, className)}>
      <i className={icon} />
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["normal", "primary", "secondary", "tertiary", "info"]),
  className: PropTypesUtils.className
};

export default Icon;
