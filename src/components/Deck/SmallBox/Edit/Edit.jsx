import React from 'react';
import styles from './Edit.module.css';
import Base from '../Base';
import TextField from '../../../TextField';
import TextArea from '../../../TextArea';
import Button from '../../../Button';

const Edit = (props) => {

  const {
    className,
    deck,
    autoFocus = true,
    validate = () => true,
    onDeckChange = (newDeck) => {},
    onFinish = () => {},
    onCancel = () => {}
  } = props;

  const render = () => {
    return (
      <Base
        tabIndex='1'
        className={className} 
        title={renderTitle()}
        content={renderContent()}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
      />
    );
  };

  const renderTitle = () => {
    return (
      <TextField
        autoFocus={autoFocus} className='inherit'
        placeholder='Name'
        value={deck && deck.name ? deck.name: ''}
        onChange={inputNameChanged}
      />
    );
  };

  const renderContent = () => {
    return (
      <TextArea
        className={`inherit ${styles.inputDescription}`} row='2'
        placeholder='Description'
        value={deck && deck.description ? deck.description : ''}
        onChange={inputDescriptionChanged}
      />
    );
  };

  const onBlur = (e) => {
    const target = e.currentTarget;
    setTimeout(() => {
      if (!target.contains(document.activeElement)) {
        finish();
      }
    }, 0);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Escape')
      onCancel();
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finish();
    }
  };

  const inputNameChanged = (e) => {
    onDeckChange(deck.set('name', e.target.value));
  };

  const inputDescriptionChanged = (e) => {
    onDeckChange(deck.set('description', e.target.value));
  };

  const finish = () => {
    if (validate()) {
      onFinish();
    }
  };

  return render();

}

export default Edit;
