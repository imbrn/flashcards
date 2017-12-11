import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Title.css";

const Title = ({
  children,
  size = "lg",
  color = "normal",
  className,
  ...rest
}) => {
  const modifiersClasses = classnames(styles[size], styles[color]);

  return (
    <h1
      {...rest}
      className={classnames(styles.title, modifiersClasses, className)}
    >
      {children}
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf([
    "normal",
    "primary",
    "secondary",
    "tertiary",
    "danger"
  ]),
  className: PropTypesUtils.className
};

export default Title;
