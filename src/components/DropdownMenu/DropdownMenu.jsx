import React from "react";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown";
import styles from "./DropdownMenu.m.css";
import classnames from "classnames";

const DropdownMenu = ({ items, className, ...rest }) => {

  const renderBox = () => {
    return <div className={styles.box}>{ items.map(renderMenuItem) }</div>;
  };

  return (
    <Dropdown {...rest} className={classnames(styles.dropdownMenu, className)}
      boxChildren={renderBox()}
    />
  );
};

const renderMenuItem = (item, key) => {
  if (item.type === "separator") {
    return <Separator key={key} />;
  } else {
    return <Item {...item} key={key} />
  }
};

const Separator = ({ className, ...rest }) => {
  return (
    <hr {...rest} className={classnames(styles.separator, className)} />
  );
};

const Item = ({ tag, icon, text, className, color="normal", ...rest }) => {
  const Tag = tag ? tag : DefaultTag;
  return (
    <Tag {...rest} className={classnames(styles.item, className, styles[color])}>
      { icon ? <ItemIcon icon={icon} /> : null }
      <span>{text}</span>
    </Tag>
  );
};

Item.propTypes = {
  tag: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf([ "normal", "primary", "secondary", "tertiary", "danger" ]),
};

const ItemIcon = ({ icon, className, ...rest }) => {
  return (
    <span {...rest} className={classnames(styles.icon, className)}>
      <i className={icon} />
    </span>
  );
};

const DefaultTag = ({ children, ...rest }) => {
  return (
    <a {...rest} href="#">
      {children}
    </a>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DropdownMenu;
