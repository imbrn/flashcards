import React from 'react';
import Dropdown from '../Dropdown';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMenu = ({ buttonContent, children, className, ...rest }) => {
  return (
    <Dropdown
      {...rest}
      className={classnames('dropdown-menu', className)}
      buttonContent={buttonContent}
      content={children}
    />
  );
};

DropdownMenu.propTypes = {
  buttonContent: PropTypes.element.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default DropdownMenu;
