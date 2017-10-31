import React from 'react';
import styles from './Base.module.css';
import Sides from './Sides';

const Base = (props) => {

  const { front, back, frontHeader, backHeader, side=Sides.FRONT, className, onClickSide } = props;

  const onClickFront = () => {
    if (onClickSide) onClickSide(Sides.FRONT);
  };

  const onClickBack = () => {
    if (onClickSide) onClickSide(Sides.BACK);
  };

  const sideClassName = side === Sides.BACK ? 'back' : 'front';

  const renderFrontHeader = () => {
    return (
      <div>
        <span>Front</span>
      </div>
    );
  };

  return (
    <div className={`${styles.flipContainer} ${className} ${sideClassName}`}>
      <div className={styles.flipper}>
        <Side className={styles.front} header={renderFrontHeader()} onClick={onClickFront}>
          {front}
        </Side>
        <Side className={styles.back} header={backHeader} onClick={onClickBack}>
          {back}
        </Side>
      </div>
    </div>
  );

};

const Side = ({ children, header, className = '', ...rest }) => {

  const renderHeader = () => {
    return (
      <header>
        {header}
      </header>
    );
  };

  return (
    <div className={`${styles.side} has-bg-white raised ${className}`} {...rest}>
      { header ? renderHeader() : null }
      <div className={`${styles.sideContent} gutters-0_5`}>
        {children}
      </div>
    </div>
  );

};

export default Base;
