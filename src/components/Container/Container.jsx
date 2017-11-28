import React from "react";
import classnames from "classnames";
import styles from "./Container.m.css";

const Container = ({ children, className, ...rest }) => {
  return (
    <div className={classnames(styles.container, className)}>
      {children}
    </div>
  );
};

export default Container;
