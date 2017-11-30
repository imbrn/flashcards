import React from "react";

const MoreVertButton = ({ children, ...rest }) => {
  return (
    <span {...rest}>
      <span>{children}</span>
      <span className="icon"><i className="fa fa-ellipsis-v" /></span>
    </span>
  );
};

export default MoreVertButton;
