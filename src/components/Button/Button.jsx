import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({ tag = "button", children, className, tertiary, ...rest }) => {
  const Tag = tag;
  const typeClass = tertiary ? styles.tertiary : null;

  return (
    <Tag {...rest} className={classnames(styles.button, typeClass, className)}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypesUtils.className,
  tertiary: PropTypes.bool,
};

export default Button;
