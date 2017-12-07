import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({
  tag = "button",
  children,
  size = "medium",
  type = "normal",
  className,
  ...rest
}) => {
  const Tag = tag;
  const modifiersClasses = classnames(styles[size], styles[type]);

  return (
    <Tag
      {...rest}
      className={classnames(styles.button, modifiersClasses, className)}
    >
      {children}
    </Tag>
  );
};

Button.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "big"]),
  type: PropTypes.oneOf([
    "normal",
    "primary",
    "secondary",
    "tertiary",
    "danger",
    "success"
  ]),
  className: PropTypesUtils.className
};

export default Button;
