import React from 'react';
import Base from '../Base';
import styles from './View.module.css';

const View = ({ card, ...rest }) => {

  const frontRender = <span>{card.front}</span>;
  const backRender = <span>{card.back}</span>;

  return (
    <Base
      front={frontRender}
      back={backRender}
      {...rest}
    />
  );

};

export default View;
