import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./Button.m.css";

const Button = ({ children, icon, color, size, ...rest }) => {
  return (
    <button {...rest} className={classnames(styles.button, colorClass(color), sizeClass(size))}>
      { icon ? <span className={styles.icon}><i className={icon} /></span> : null }
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  color: PropTypes.oneOf(["normal", "primary", "secondary", "tertiary"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

function colorClass(color="normal") {
  return styles[color];
}

function sizeClass(size="md") {
  return styles[size];
}

export default Button;
