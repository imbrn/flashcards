import React from 'react';
import classnames from 'classnames';

const ImageAndTextItem = ({ text, icon, ...rest }) => {
  return (
    <a {...rest} className={classnames('dropdown-item')}>
      <span className='icon'>
        <i className={icon} />
      </span>
      <span>{text}</span>
    </a>
  );
};

export default ImageAndTextItem;
