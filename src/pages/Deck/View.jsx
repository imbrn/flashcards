import React from 'react';
import styles from './View.module.css';
import ActionsBar from '../../components/ActionsBar';
import CardView from '../../components/Card/SmallPaper/View';
import CardEdit from '../../components/Card/SmallPaper/Edit';

const View = ({ deck }) => {

  const renderCards = () => {
    return deck.cards.toArray().map(card => (
      <div key={card.id} className={`${styles.cardWrapper} gutters`}>
        <CardEdit className={styles.card} card={card} />
      </div>
    ));
  };

  return (
    <div className='container'>
      <ActionsBar>
        <div className='is-pulled-right'>
          <button className='button is-primary'>
            <span className='icon'><i className='fa fa-plus' /></span>
            <span>Create card</span>
          </button>
        </div>
      </ActionsBar>
      <div className={`${styles.cards} gutters`}>
        {renderCards()}
      </div>
    </div>
  );

};

export default View;
