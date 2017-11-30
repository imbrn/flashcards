import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import classnames from "classnames";
import styles from "./Dropdown.m.css";

class Dropdown extends React.Component {

  state = {
    open: false,
  };

  constructor(props) {
    super(props);

    this.onClickButton = this.onClickButton.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  render() {
    const {
      side = "left",
      buttonChildren,
      buttonProps = {},
      boxChildren,
      boxProps = {},
      className,
      ...rest
    } = this.props;

    return (
      <div {...rest} className={classnames(styles.dropdown, side, className)}>

        <DropdownButton {...buttonProps} open={this.state.open} onClick={this.onClickButton}>
          {buttonChildren}
        </DropdownButton>

        <DropdownBox {...boxProps} open={this.state.open}>
          {boxChildren}
        </DropdownBox>

      </div>
    );
  }

  onClickButton() {
    this.toggle();
  }

  toggle() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    this.setState(state => {
      return { open: false };
    }, () => {
      this.uninstallOutsideClickHandler();
    });
  }

  open() {
    this.setState(state => {
      return { open: true };
    }, () => {
      this.installOutsideClickHandler();
    });
  }

  installOutsideClickHandler() {
    document.addEventListener('click', this.onClickOutside);
  }

  uninstallOutsideClickHandler() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside() {
    this.close();
  }

  componentWillUnmount() {
    this.close();
  }

}

const DropdownButton = ({ children, className, ...rest }) => {
  return (
    <Button {...rest} className={classnames(styles.button, className)}>
      {children}
    </Button>
  );
};

const DropdownBox = ({ children, className, open, ...rest }) => {
  const openClass = open ? "open": null;
  return (
    <div className={classnames(styles.box, className, openClass)}>
      {children}
    </div>
  );
};

Dropdown.propTypes = {
  side: PropTypes.oneOf(["left", "right"]),
  buttonChildren: PropTypes.node.isRequired,
  buttonProps: PropTypes.object,
  boxChildren: PropTypes.node.isRequired,
  boxProps: PropTypes.object,
  className: PropTypes.string,
};

export default Dropdown;
