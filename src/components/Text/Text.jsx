import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Text.css";

const Text = ({
  children,
  color = "normal",
  size = "md",
  bold = false,
  className,
  ...rest
}) => {
  const modifiersClasses = classnames(
    styles[color],
    styles[size],
    bold ? styles.bold : null
  );
  return (
    <p
      {...rest}
      className={classnames(styles.text, modifiersClasses, className)}
    >
      {children}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["normal"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  bold: PropTypes.bool,
  className: PropTypesUtils.className
};

export default Text;
