import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DropdownMenuItem = ({ children, className, tag=null, ...rest }) => {
  const Wrapper = tag ? tag : NormalLink;

  return (
    <Wrapper {...rest} className={classnames('dropdown-menu-item', className)}>
      {children}
    </Wrapper>
  );
};

const NormalLink = ({ children, ...rest }) => {
  return (
    <a href='#' {...rest}>
      {children}
    </a>
  );
};

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.func,
};

export default DropdownMenuItem;
