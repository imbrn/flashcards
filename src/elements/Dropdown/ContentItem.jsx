import React from 'react';

const ContentItem = ({ children, ...rest }) => {
  return (
    <div {...rest} className='dropdown-item'>
      {children}
    </div>
  );
};

export default ContentItem;
