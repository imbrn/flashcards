import React from 'react';
import Button from '../Button';

const IconButton = ({ text, icon, ...rest }) => {

  const renderText = () => {
    return (
      <span>
        {text}
      </span>
    );
  };

  return (
    <Button {...rest}>
      <span className='icon'>
        <i className={`fa ${icon}`}/>
      </span>
      { text ? renderText() : null }
    </Button>
  );

};

export default IconButton;
