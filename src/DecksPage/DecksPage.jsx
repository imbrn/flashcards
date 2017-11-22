import React from 'react';
import Deck, { DeckMenuModel } from './components/Deck';
import DeckModel from './DeckModel';
import { Link } from 'react-router-dom';

const models = [

  DeckModel({
    id: 1,
    name: 'Deck one',
    description: 'This is the deck one'
  }),

  DeckModel({
    id: 2,
    name: 'The deck two',
  }),

  DeckModel({
    id: 3,
    name: 'Three',
    description: 'Deck three, which is bit larger for testing purposes'
  })

];

const DecksPage = () => {

  return (
    <div className='container mx-auto'>
      <div className='flex flex-wrap min-h-full'>
        {
          models.map(model => {

            const menuModel = [
              DeckMenuModel.link({
                text: 'Manage cards',
                icon: 'fa fa-sticky-note-o',
                tag: Link,
                to: `/decks/${model.id}`,
              }),
              DeckMenuModel.link({
                text: 'Edit',
                icon: 'fa fa-pencil',
                onClick: () => console.log('Edit'),
              }),
              DeckMenuModel.separator(),
              DeckMenuModel.link({
                text: 'Delete',
                icon: 'fa fa-trash-o',
                onClick: () => console.log('Delete'),
                type: 'danger',
              }),
            ];

            return (
              <div key={model.id} className='p-2' style={{ width: '260px' }}>
                <Deck model={model} menuModel={menuModel} />
              </div>
            );

          })
        }
      </div>
    </div>
  );

};

export default DecksPage;
