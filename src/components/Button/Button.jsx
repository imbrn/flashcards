import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../commons/propTypesUtils";
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
  tag: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypesUtils.className,
  tertiary: PropTypes.bool,
};

export default Button;
