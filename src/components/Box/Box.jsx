import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Box.css";

const Box = ({
  children,
  elevation = 1,
  room = "normal",
  className,
  ...rest
}) => {
  const modifiersClasses = [
    elevation > 0 && styles[`elevation-${elevation}`],
    styles[`room-${room}`]
  ];

  return (
    <div
      {...rest}
      className={classnames(styles.box, modifiersClasses, className)}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.oneOf([0, 1, 2, 3]),
  room: PropTypes.oneOf(["small", "normal", "big"]),
  className: PropTypesUtils.className
};

export default Box;
