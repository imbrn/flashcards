import React from 'react';
import Dropdown from '../Dropdown';
import DropdownMenuItem from './DropdownMenuItem';
import DropdownMenuSeparator from './DropdownMenuSeparator';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMenu = ({ buttonContent, model, className, ...rest }) => {
  return (
    <Dropdown
      {...rest}
      className={classnames('dropdown-menu', className)}
      buttonContent={buttonContent}
      content={<Content model={model} />}
    />
  );
};

const Content = ({ model }) => {
  return model.map(renderMenuItem);
};

function renderMenuItem(item, index) {
  if (item.itemType === 'link') {
    return renderMenuLink(index, item);
  } else if (item.itemType === 'separator') {
    return renderMenuSeparator(index);
  } else {
    return null;
  }
}

function renderMenuLink(id, { text, icon, type, tag, ...rest}) {
  return (
    <DropdownMenuItem key={id} tag={tag} {...rest} className={type ? type : null}>
      { icon ? <span className='icon'><i className={icon} /></span> : null }
      <span>{text}</span>
    </DropdownMenuItem>
  );
}

function renderMenuSeparator(id) {
  return <DropdownMenuSeparator key={id} />;
}

DropdownMenu.propTypes = {
  buttonContent: PropTypes.element.isRequired,
  model: PropTypes.array.isRequired,
};

export default DropdownMenu;
