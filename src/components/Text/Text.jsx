import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Text.css";

const Text = ({
  children,
  color = "normal",
  size = "md",
  className,
  ...rest
}) => {
  const modifiersClasses = classnames(styles[color], styles[size]);
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
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["normal"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypesUtils.className
};

export default Text;
