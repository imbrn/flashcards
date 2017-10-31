import React from 'react';
import { Link } from 'react-router-dom';
import styles from './View.module.css';
import Base from '../Base';
import Button from '../../../Button';
import IconButton from '../../../IconButton';

class View extends React.Component {

  state = {
    menuOpened: false
  };

  constructor(props) {
    super(props);
    this._bindEvents();
  }

  _bindEvents() {
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  _handleClickOutside() {
    this.setState({ menuOpened: false });
    document.removeEventListener('click', this._handleClickOutside, true);
  }

  render() {
    const { className, deck } = this.props;
    return (
      <Base className={className}
        title={deck.name}
        actions={this._renderActions()}
        content={this._renderContent()}
        footer={this._renderFooter()}
      />
    );
  }

  _renderActions() {
    if (this.props.menuItems) {
      const activeClass = this.state.menuOpened ? 'is-active' : '';
      return (
        <div>
          <div className={`dropdown is-right ${activeClass}`}>
            <div className='dropdown-trigger'>
              <IconButton type='primary' size='small' icon='fa-chevron-down'
                onClick={this._menuButtonClicked.bind(this)} />
            </div>
            <div className='dropdown-menu'>
              <div className='dropdown-content'>
                {this._renderMenuItems(this.props.menuItems)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  _menuButtonClicked() {
    this._openMenu();
  }

  _openMenu() {
    document.addEventListener('click', this._handleClickOutside, true);
    this.setState((prevState) => {
      return {  menuOpened: !prevState.menuOpened };
    });
  }

  _renderMenuItems(menuItems) {
    return menuItems.map(this._renderMenuItem.bind(this));
  }

  _renderMenuItem(item, index) {
    switch (this._findMenuItemType(item)) {
      case MenuItemType.NORMAL_LINK: return this._renderMenuItemNormalLink(item, index);
      case MenuItemType.ROUTER_LINK: return this._renderMenuItemRouterLink(item, index);
      default: return this._renderMenuItemAction(item, index);
    }
  }

  _findMenuItemType(item) {
    if (item.hasOwnProperty('to')) return MenuItemType.ROUTER_LINK;
    if (item.hasOwnProperty('action')) return MenuItemType.ACTION;
    return MenuItemType.NORMAL_LINK;
  }

  _renderMenuItemNormalLink(item, index) {
    return (
      <a key={index} href={item.href} className='dropdown-item' onClick={item.action}>
        <i className={item.icon} />
        <span className='gutter-left'>{item.label}</span>
      </a>
    );
  }

  _renderMenuItemRouterLink(item, index) {
    return (
      <Link key={index} to={item.to} className='dropdown-item' onClick={item.action}>
        <i className={item.icon} />
        <span className='gutter-left'>{item.label}</span>
      </Link>
    );
  }

  _renderMenuItemAction(item, index) {
    return (
      <a key={index} onClick={item.action} className='dropdown-item'>
        <i className={item.icon} />
        <span className='gutter-left'>{item.label}</span>
      </a>
    );
  }

  _renderContent() {
    const { deck } = this.props;
    return (
      <div className={styles.content}>
        <p className={styles.description}>{deck.description}</p>
        <p className='is-size-7 has-text-grey-light'>{deck.cards.size} cards.</p>
      </div>
    );
  }

  _renderFooter() {
    return (
      <div>
        <Button outlined type='primary' className={styles.studyButton}>
          Study
        </Button>
      </div>
    );
  }

}

const MenuItemType = {
  NORMAL_LINK: 'NORMAL_LINK',
  ROUTER_LINK: 'ROUTER_LINK',
  ACTION: 'ACTION'
};

export default View;
