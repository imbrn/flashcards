import React from "react";

const ButtonImpl = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default ButtonImpl;
