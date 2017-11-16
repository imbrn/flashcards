import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import buttonContent from './buttonContent';

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  render() {
    const { button, type, strong, children } = this.props;
    
    return (
      <Root open={this.state.open}>
        <Trigger type={type} strong={strong} onTrigger={this._onTrigger.bind(this)}>
          {button}
        </Trigger>
        <Menu open={this.state.open}>
          {children}
        </Menu>
      </Root>
    );
  }

  _onTrigger() {
    this._toggle();
  }

  _toggle() {
    if (this.state.open) {
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    document.addEventListener('click', this._handleOutsideClick, true);
    this.setState({
      open: true
    });
  }

  _close() {
    this.setState({
      open: false
    });
  }

  _handleOutsideClick() {
    this._close();
    document.removeEventListener('click', this._handleOutsideClick, true);
  }

  componentWillUnmount() {
    this._close();
  }

}

const Root = ({ children, open, ...rest }) => {
  const activeClass = open ? 'is-active' : null;
  return (
    <div {...rest} className={classnames('dropdown', activeClass)}>
      {children}
    </div>
  );
};

const Trigger = ({ children, type, strong, onTrigger, ...rest }) => {
  let Content;

  if (typeof children === 'string') {
    Content = buttonContent.textAndIcon(children);
  } else {
    Content = children;
  }

  return (
    <div {...rest} className='dropdown-trigger'>
      <Button type={type} strong={strong} onClick={onTrigger}>
        <Content />
      </Button>
    </div>
  );
};

const Menu = ({ children, ...rest }) => {
  return (
    <div className='dropdown-menu'>
      <div className='dropdown-content'>
        {children}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  button: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,

  children: PropTypes.arrayOf(PropTypes.node)
};

export default Dropdown;
