import React from 'react';
import styles from './View.module.css';
import DeckView from '../../components/Deck/SmallBox/View';
import DeckEdit from '../../components/Deck/SmallBox/Edit';
import DeckDelete from '../../components/Deck/SmallBox/Delete';
import CreatingDeckActions from '../../flux/CreatingDeck/Actions';
import EditingDeckActions from '../../flux/EditingDeck/Actions';
import DeletingDeckActions from '../../flux/DeletingDeck/Actions';

const View = (props) => {

  const renderNav = () => {
    return (
      <div className={`${styles.actionBar} margin-bottom`}>
        <div className={`container`}>
          <div className={`has-border has-border-grey-lighter has-border-bottom
              gutters ${styles.content}`}>
            <div className={styles.actions}>
              <button className='button is-primary'
                onClick={onClickButtonCreateDeck}>
                <span className='icon'><i className='fa fa-plus' /></span>
                <span>Create deck</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onClickButtonCreateDeck = () => {
    CreatingDeckActions.start();
  };

  const renderAddedDecks = () => {
    return props.decks.toArray().map(deck => (
      <div key={deck.id} className={styles.deckWrapper}>
        {renderAddedDeck(deck)}
      </div>
    ));
  };

  const renderAddedDeck = (deck) => {
    if (isEditing(deck)) return renderEditingDeck(props.editingDeck.get('deck'));
    if (isDeleting(deck)) return renderDeletingDeck(props.deletingDeck.get('deck'));
    return renderNormalDeck(deck);
  };

  const isEditing = (deck) => {
    return props.editingDeck.get('editing') && props.editingDeck.get('deck').id === deck.id;
  };

  const isDeleting = (deck) => {
    return props.deletingDeck.get('deleting') && props.deletingDeck.get('deck').id === deck.id;
  };

  const renderEditingDeck = (deck) => {
    return <DeckEdit
      deck={deck}
      className={styles.deck}
      onFinish={onFinishDeckEdit}
      onCancel={onCancelDeckEdit}
      onDeckChange={onChangeEditingDeck}
    />;
  };

  const onFinishDeckEdit = () => {
    EditingDeckActions.finish();
  };

  const onCancelDeckEdit = () => {
    EditingDeckActions.cancel();
  };

  const onChangeEditingDeck = (deck) => {
    EditingDeckActions.update(deck);
  };

  const renderDeletingDeck = (deck) => {
    return <DeckDelete
      deck={deck}
      className={styles.deck}
      onConfirm={onConfirmDeckDelete}
      onCancel={onCancelDeckDelete}
    />;
  };

  const onConfirmDeckDelete = () => {
    DeletingDeckActions.confirm();
  };

  const onCancelDeckDelete = () => {
    DeletingDeckActions.cancel();
  };

  const renderNormalDeck = (deck) => {
    return <DeckView
      className={styles.deck}
      deck={deck}
      menuItems={buildMenuItems(deck)}
    />;
  };

  const buildMenuItems = (deck) => {
    return [
      { label: 'Manage cards', icon: 'fa fa-sticky-note-o', to: `/decks/${deck.id}`},
      { label: 'Edit', icon:'fa fa-pencil', action: () => onRequestDeckEdit(deck) },
      { label: 'Delete', icon: 'fa fa-trash', action: () => onRequestDeckDelete(deck) }
    ];
  };

  const onRequestDeckEdit = (deck) => {
    EditingDeckActions.start(deck);
  };

  const onRequestDeckDelete = (deck) => {
    DeletingDeckActions.delete(deck);
  };

  const renderCreatingDeck = () => {
    if (props.creatingDeck.get('creating')) {
      return (
        <div className={styles.deckWrapper}>
          <DeckEdit className={styles.deck}
            deck={props.creatingDeck.get('deck')}
            onDeckChange={onCreatingDeckChange}
            onFinish={onCreatingDeckFinish}
            onCancel={onCreatingDeckCancel}
          />
        </div>
      );
    }
  };

  const onCreatingDeckChange = (deck) => {
    CreatingDeckActions.update(deck);
  };

  const onCreatingDeckFinish = () => {
    CreatingDeckActions.finish();
  };

  const onCreatingDeckCancel = () => {
    CreatingDeckActions.cancel();
  };

  return (
    <div>
      { renderNav() }
      <div className={'container'}>
        <div className={styles.decks}>
          { renderAddedDecks() }
          { renderCreatingDeck() }
        </div>
      </div>
    </div>
  );

};

export default View;

