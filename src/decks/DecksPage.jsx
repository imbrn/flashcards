import React from 'react';
import Deck from './components/Deck';
import { DropdownMenuModel } from '../common/components/DropdownMenu';
import DeckModel from './DeckModel';
import { Link } from 'react-router-dom';

const models = [

  DeckModel({
    id: 1,
    name: 'Phrasal verbs',
    description: 'A phrasal verb is a phrase that indicates an action—such as turn down or ran into.',
    front: 'English',
    back: 'Português',
  }),

  DeckModel({
    id: 2,
    name: 'Capitais brasileiras',
    description: 'Cidades capitais dos estados brasileiros',
    front: 'Estado',
    back: 'Capital',
  }),

  DeckModel({
    id: 3,
    name: 'Sete maneiras de dizer "não entendi"',
    front: 'English',
    back: 'Português',
  })

];

const DecksPage = () => {

  return (
    <div className='container mx-auto'>
      <div className='flex flex-wrap min-h-full'>
        {
          models.map(model => {

            const menuModel = [
              DropdownMenuModel.link({
                text: 'Manage cards',
                icon: 'fa fa-sticky-note-o',
                tag: Link,
                to: `/decks/${model.id}`,
              }),
              DropdownMenuModel.link({
                text: 'Edit',
                icon: 'fa fa-pencil',
                onClick: () => console.log('Edit'),
              }),
              DropdownMenuModel.separator(),
              DropdownMenuModel.link({
                text: 'Delete',
                icon: 'fa fa-trash-o',
                onClick: () => console.log('Delete'),
                type: 'danger',
              }),
            ];

            return (
              <div key={model.id} className='p-2' style={{ width: '280px', minHeight: '280px' }}>
                <Deck model={model} menuModel={menuModel} className='h-full'/>
              </div>
            );

          })
        }
      </div>
    </div>
  );

};

export default DecksPage;
