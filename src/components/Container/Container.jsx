import React from "react";
import classnames from "classnames";
import styles from "./Container.m.css";
import PropTypes from "prop-types";

const Container = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.container, className)}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default Container;
