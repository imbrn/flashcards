import React from "react";
import classnames from "classnames";
import styles from "./ResponsiveContainer.m.css";
import PropTypes from "prop-types";

const ResponsiveContainer = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.container, className)}>
      {children}
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default ResponsiveContainer;
