import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Button = ({ children, color, size, ...rest }) => {
  return (
    <button {...rest} className={classnames("button", colorClass(color), sizeClass(size))}>
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["normal", "primary", "secondary", "tertiary"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

function colorClass(color="normal") {
  return `button-${color}`;
}

function sizeClass(size="md") {
  return `button-${size}`;
}

export default Button;
