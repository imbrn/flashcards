import React from 'react';
import Base, { Sides } from '../Base';
import styles from './Edit.module.css';
import TextArea from 'react-textarea-autosize';

class Edit extends React.Component {

  componentDidMount() {
    this._frontRef.focus();
  }

  render() {

    const { card, onChange, ...rest } = this.props;

    const renderFront = () => {
      return <TextArea
        inputRef={(ref) => this._frontRef = ref }
        className={`textarea is-shadowless ${styles.cardInput}`}
        placeholder="Front"
        value={fixText(card.front)}
        onChange={onChangeFront}
      />;
    };

    const onChangeFront = (e) => {
      const newCard = card.set('front', e.target.value);
      fireChangeCard(newCard);
    };

    const renderBack = () => {
      return <TextArea
        inputRef={(ref) => this._backRef = ref }
        className={`textarea is-shadowless ${styles.cardInput}`}
        placeholder="Back"
        value={fixText(card.back)}
        onChange={onChangeBack}
      />;
    };

    const onChangeBack = (e) => {
      const newCard = card.set('back', e.target.value);
      fireChangeCard(newCard);
    };

    const fireChangeCard = (newCard) => {
      if (onChange)
        onChange(newCard, card);
    };

    const fixText = (text) => {
      return text ? text.replace(/\s{2,}/, ' ', 'g') : '';
    };

    const onClickSide = (side) => {
      if (side === Sides.FRONT) this._frontRef.focus();
      if (side === Sides.BACK) this._backRef.focus();
    };

    return (
      <Base
        {...rest}
        className={styles.card}
        onClickSide={onClickSide}
        front={renderFront()}
        back={renderBack()}
      />
    );

  }

}

export default Edit;
