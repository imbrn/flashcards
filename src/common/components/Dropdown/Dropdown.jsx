import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {

  state = {
    open: false
  };

  constructor(props) {
    super(props);
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  componentWillUnmount() {
    this._close();
  }

  render() {

    const {
      buttonContent,
      content,
      className = null,
      buttonClassName = null,
      contentClassName = null,
      ...rest
    } = this.props;

    const activeClass = this.state.open ? 'is-active' : '';

    return (
      <div {...rest} className={classnames('dropdown', className, activeClass)}>
        <button
          ref={ref => this.buttonRef = ref }
          type='button'
          className={classnames('dropdown-button', buttonClassName)}
          onClick={this.onClickButton.bind(this)}>
          {buttonContent}
        </button>
        <div className={classnames('dropdown-content', contentClassName)}>
          {content}
        </div>
      </div>
    );

  }

  onClickButton(e) {
    if (this.state.open) {
      this._close();
    } else {
      this._open();
    }
  }

  _close() {
    this.setState({ open: false }, () => {
      this._uninstallOutsideClickHandler();
    });
  }

  _open() {
    this.setState({ open: true }, () => {
      this._installOutsideClickHandler();
    });
  }

  _installOutsideClickHandler() {
    document.addEventListener('click', this._onClickOutside, true);
  }

  _uninstallOutsideClickHandler() {
    document.removeEventListener('click', this._onClickOutside, true);
  }

  _onClickOutside(e) {
    if (!this.buttonRef.contains(e.target)) {
      this._close();
    }
  }

}

Dropdown.propTypes = {
  buttonContent: PropTypes.element.isRequired,
  content: PropTypes.node.isRequired,
};

export default Dropdown;
