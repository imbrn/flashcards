import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./ResponsiveContainer.css";

const ResponsiveContainer = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={classnames(styles.root, className)}>
      {children}
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypesUtils.className
};

export default ResponsiveContainer;
