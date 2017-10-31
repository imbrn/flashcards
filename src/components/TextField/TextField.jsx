import React from 'react';

const TextField = ({ value = '', className = '', ...rest }) => {

  return (
    <input type='text' className={`input ${className}`} value={value} {...rest} />
  );

};

export default TextField;
