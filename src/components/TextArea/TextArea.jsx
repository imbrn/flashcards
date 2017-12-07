import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import styles from "./TextArea.css";
import classnames from "classnames";

const TextArea = ({
  className,
  size = "medium",
  type = "normal",
  rows = 1,
  ...rest
}) => {
  const modifiersClasses = classnames(styles[size], styles[type]);

  return (
    <textarea
      {...rest}
      className={classnames(styles.textArea, modifiersClasses, className)}
      rows={rows}
    />
  );
};

TextArea.propTypes = {
  className: PropTypesUtils.className,
  size: PropTypes.oneOf(["small", "medium", "big"]),
  type: PropTypes.oneOf(["normal", "primary", "danger", "success"]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default TextArea;
