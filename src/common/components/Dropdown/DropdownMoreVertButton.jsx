import React from 'react';

const DropdownMoreVertButton = ({ children }) => {
  return (
    <span className='dropdown-more-vert-button'>
      <span>{children}</span>
      <span className='icon'>
        <i className='fa fa-ellipsis-v' />
      </span>
    </span>
  );
};

export default DropdownMoreVertButton;
