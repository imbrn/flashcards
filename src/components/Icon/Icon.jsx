import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../commons/propTypesUtils.js";
import classnames from "classnames";

const Icon = ({ icon, className, ...rest }) => {
  return (
    <span {...rest} className={classnames(className)}>
      <i className={icon} />
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypesUtils.className,
};

export default Icon;
