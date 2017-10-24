import React from 'react';
import styles from './Edit.module.css';
import Base from '../Base';

const Edit = (props) => {

  const {
    className,
    deck,
    autoFocus = true,
    buttonConfirmText = 'Done',
    buttonCancelText = 'Cancel',
    inputNameRef,
    inputDescriptionRef,
    onDeckChange,
    onFinish,
    onCancel
  } = props;

  const name = deck && deck.name ? deck.name : '';
  const description = deck && deck.description ? deck.description : '';

  const renderTitle = () => {
    return (
      <input className='input inherit' type='text' ref={inputNameRef}
        autoFocus={autoFocus}
        placeholder='Name' value={name}
        onChange={inputNameChanged}
      />
    );
  };

  const inputNameChanged = (e) => {
    const newDeck = deck.set('name', e.target.value);
    fireDeckChanged(newDeck);
  };

  const renderContent = () => {
    return (
      <textarea className={`textarea inherit ${styles.inputDescription}`}
        rows="2" ref={inputDescriptionRef}
        placeholder='Description' value={description}
        onChange={inputDescriptionChanged}
      />
    );
  };

  const inputDescriptionChanged = (e) => {
    const newDeck = deck.set('description', e.target.value);
    fireDeckChanged(newDeck);
  };

  const fireDeckChanged = (newDeck) => {
    if (onDeckChange)
      onDeckChange(newDeck);
  };

  const renderFooter = () => {
    return (
      <div className={styles.buttons}>
        <button className='button is-primary is-outlined margin-right-0_5'
          onClick={buttonConfirmClicked}>
          {buttonConfirmText}
        </button>
        <button className='button is-danger is-outlined margin-left-0_5'
          onClick={buttonCancelClicked}>
          {buttonCancelText}
        </button>
      </div>
    );
  };

  const buttonConfirmClicked = () => {
    if (onFinish)
      onFinish();
  };

  const buttonCancelClicked = () => {
    if (onCancel)
      onCancel();
  };

  return (
    <Base className={className} 
      title={renderTitle()}
      content={renderContent()}
      footer={renderFooter()}
    />
  );

};

export default Edit;
