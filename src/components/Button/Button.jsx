import React from 'react';

const Button = ({ children, type, size, outlined=false, className='', ...rest }) => {

  const typeClass = type ? 'is-' + type : '';
  const outlineClass = outlined ? 'is-outlined' : '';
  const sizeClass = size ? 'is-' + size : '';

  return (
    <button className={`button ${typeClass} ${sizeClass} ${className} ${outlineClass}`} {...rest}>
      {children}
    </button>
  );

};

export default Button;
