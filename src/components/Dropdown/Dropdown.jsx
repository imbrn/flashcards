import React from "react";
import PropTypes from "prop-types";
import PropTypesUtils from "../prop-types-utils";
import classnames from "classnames";
import styles from "./Dropdown.css";
import Button from "../Button";
import Icon from "../Icon";

class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentWillUnmount() {
    this.close();
  }

  render() {
    const {
      icon = "fa fa-ellipsis-v",
      text,
      side="left",
      actions,
      className,
      ...rest
    } = this.props;

    const popupClasses = [
      styles.popup,
      styles[side],
      !this.state.open ? "hidden" : null,
    ];

    const renderAction = (action, key) => {
      return <MenuAction action={action} key={key} />;
    };

    return (
      <div {...rest} className={classnames(styles.dropdown, className)}>
        <Button onClick={this.onClickButton}>
          { icon ? <Icon icon={icon} /> : null }
          { text ? text : null }
        </Button>
        <div className={classnames(popupClasses)}>
          { actions.map(renderAction) }
        </div>
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
    this.setState({
      open: false,
    }, () => {
      this.stopHandlingOutsideClick();
    });
  }

  open() {
    this.setState(() => {
      return { open: true };
    }, () => {
      this.startHandlingOutsideClick();
    });
  }

  stopHandlingOutsideClick() {
    document.removeEventListener("click", this.onClickOutside);
  }

  startHandlingOutsideClick() {
    document.addEventListener("click", this.onClickOutside);
  }

  onClickOutside() {
    this.close();
  }

}

Dropdown.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  side: PropTypes.oneOf([ "left", "right" ]),
  actions: PropTypes.arrayOf(PropTypes.object),
  className: PropTypesUtils.className,
};

const MenuAction = ({ action, ...rest }) => {
  if (action.hasOwnProperty("icon") ||
      action.hasOwnProperty("text") ||
      action.hasOwnProperty("tag")) {
    return <MenuItem {...rest} action={action} />;
  } else {
    return <MenuSeparator {...rest} action={action} />;
  }
};

MenuAction.propTypes = {
  action: PropTypes.object.isRequired,
};

const MenuItem = ({ action, ...rest }) => {
  const { tag = Button, icon, text, className, danger, ...params } = action;
  const Tag = tag;

  const classes = [
    styles.menuItem,
    danger ? styles.menuItemDanger : null,
    className,
  ];

  return (
    <Tag {...rest} {...params} className={classnames(classes)}>
      { icon ? <Icon icon={icon} className={styles.menuItemIcon} /> : null }
      { text ? text : null }
    </Tag>
  );
};

MenuItem.propTypes = {
  action: PropTypes.object.isRequired,
};

const MenuSeparator = (props) => {
  return <hr {...props} className={styles.menuSeparator} />;
};

export default Dropdown;
