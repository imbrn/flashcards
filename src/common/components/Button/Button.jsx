import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({ children, type, strong=false, ...rest }) => {

  const classNames = classnames('button', typeClass(type), modeClass(strong));

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );

};

const modeClass = (strong) => {
  if (!strong) {
    return 'is-outlined';
  }
};

const typeClass = (type) => {
  if (type) {
    return `is-${type}`;
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'link', 'info', 'success', 'warning',  'danger', 'white']),
  strong: PropTypes.bool,
};

export default Button;
