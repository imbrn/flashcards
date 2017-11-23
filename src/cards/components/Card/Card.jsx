import React from 'react';
import classnames from 'classnames';
import { DropdownMoreVertButton } from '../../../common/components/Dropdown';
import DropdownMenu from '../../../common/components/DropdownMenu';

const Card = ({ model, menuModel, className, ...rest }) => {
  return (
    <div {...rest} className={classnames('card', className)}>

      <div className='card-content'>
        <div className='card-side card-side-front'>
          {model.front}
        </div>
        <div className='card-side card-side-back'>
          {model.back}
        </div>
      </div>

      <DropdownMenu
        className='card-menu'
        model={menuModel}
        buttonContent={<DropdownMoreVertButton />}
      />

    </div>
  );
};

export default Card;
