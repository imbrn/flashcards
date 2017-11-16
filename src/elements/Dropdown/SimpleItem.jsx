import React from 'react';

const SimpleTextItem = ({ children, ...rest }) => {
  return (
    <a {...rest} className='dropdown-item'>
      {children}
    </a>
  );
};

export default SimpleTextItem;
