import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./TextField.css";

const TextField = ({
  className,
  type = "normal",
  size = "medium",
  ...rest
}) => {
  const classNames = classnames(
    styles.textField,
    styles[type],
    styles[size],
    className
  );

  return <input {...rest} type="text" className={classNames} />;
};

TextField.propTypes = {
  className: PropTypesUtils.className,
  size: PropTypes.oneOf(["small", "medium", "big"]),
  type: PropTypes.oneOf(["normal", "primary", "danger", "success"])
};

export default TextField;
