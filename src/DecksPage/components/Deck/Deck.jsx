import React from 'react';
import classnames from 'classnames';
import DropdownMenu, {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../../../common/components/DropdownMenu';

const Deck = ({ model, className, menuModel, ...rest }) => {
  return (
    <div {...rest} className={classnames('deck', className)}>

      <div className='deck-content'>
        <h1 className='name'>{model.name}</h1>
        <h2 className='description'>{model.description}</h2>

        <div className='info'>
          <div className='cards-sides'>
            <span className='card-side card-side-front'>{model.front}</span>
            <span className='card-side card-side-back'>{model.back}</span>
          </div>
          <span className='cards-count'>{model.cards.size} cards</span>
        </div>

        <div className='actions'>
          <button className='button action study'>Study</button>
          <button className='button action add-card'>Add card</button>
        </div>
      </div>

      <Menu model={menuModel} />

    </div>
  )
};

const Menu = ({ model }) => {
  return (
    <DropdownMenu className='deck-menu' buttonContent={<MenuButtonContent />}>
      { model.map(renderMenuItem) }
    </DropdownMenu>
  );
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

const MenuButtonContent = ({ children }) => {
  return (
    <span className='deck-menu-button'>
      <span>{children}</span>
      <span className='icon'>
        <i className='fa fa-ellipsis-v' />
      </span>
    </span>
  );
};

export default Deck;
