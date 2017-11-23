import React from 'react';
import Card from './components/Card';
import CardModel from './CardModel';
import DeckModel from '../decks/DeckModel';
import { DropdownMenuModel } from '../common/components/DropdownMenu';

const deckModel = DeckModel({ id: 1, name: 'Phrasal verbs', front: 'Phrasal verb', back: 'Meaning' });

const cards = [
  CardModel({ id: 1, front: `ask 'somebody' out`, back: 'invite on a date', deck: deckModel }),
  CardModel({ id: 2, front: `add up to 'something'`, back: 'equal', deck: deckModel }),
  CardModel({ id: 3, front: `break 'something' in`, back: `wear something a few times so that it doesn't look/feel new`, deck: deckModel }),
];

const CardsPage = () => {
  return (
    <div className='container mx-auto flex flex-wrap'>
      {
        cards.map(card => {
          const menuModel = [
            DropdownMenuModel.link({ text: 'Edit', icon: 'fa fa-pencil' }),
            DropdownMenuModel.link({ text: 'Delete', icon: 'fa fa-trash-o', type: 'danger' }),
          ];

          return (
            <div key={card.id} className='card-wrapper p-2'
              style={{ width: '300px', minHeight: '180px'}}>
              <Card model={card} menuModel={menuModel} className='h-full' />
            </div>
          );
        })
      }
    </div>
  );
};

export default CardsPage;
