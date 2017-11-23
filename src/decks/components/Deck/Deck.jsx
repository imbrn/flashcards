import React from 'react';
import classnames from 'classnames';
import { DropdownMoreVertButton } from '../../../common/components/Dropdown';
import DropdownMenu from '../../../common/components/DropdownMenu';

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

      <DropdownMenu
        className='deck-menu'
        buttonContent={<DropdownMoreVertButton />}
        model={menuModel} />

    </div>
  )
};

export default Deck;
