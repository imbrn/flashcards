import React from 'react';

const TextArea = ({ className = '', ...rest }) => {

  return (
    <textarea className={`textarea ${className}`} {...rest} />
  );

};

export default TextArea;
