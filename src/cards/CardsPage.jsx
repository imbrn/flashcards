import React from 'react';
import Card from './components/Card';
import CreateCard from './components/CreateCard';
import CardModel from './CardModel';
import DeckModel from '../decks/DeckModel';
import { DropdownMenuModel } from '../common/components/DropdownMenu';

const deckModel = DeckModel({ id: 1, name: 'Phrasal verbs', front: 'Phrasal verb', back: 'Meaning' });

const cards = [
  CardModel({ id: 1, front: `ask 'somebody' out`, back: 'invite on a date', deck: deckModel }),
  CardModel({ id: 2, front: `add up to 'something'`, back: 'equal', deck: deckModel }),
  CardModel({ id: 3, front: `break 'something' in`, back: `wear something a few times so that it doesn't look/feel new`, deck: deckModel }),
];

class CardsPage extends React.Component {

  state = {
    creatingCard: false
  };

  constructor(props) {
    super(props);
    this.onClickAddCard = this.onClickAddCard.bind(this);
    this.onConfirmCreateCard = this.onConfirmCreateCard.bind(this);
    this.onCancelCreateCard = this.onCancelCreateCard.bind(this);
  }

  render() {
    return (
      <div className='container mx-auto h-full relative'>
        <div className='py-8 px-2 align-right'>
          <button className='bg-tertiary text-white font-medium text-base px-4 py-2 rounded'
            onClick={this.onClickAddCard.bind(this)}>
            <i className='fa fa-plus mr-2' />
            Add card
          </button>
        </div>

        <div className='flex flex-wrap'>
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

        {
          this.state.creatingCard ?
            <CreateCard
              deckModel={deckModel}
              onConfirm={this.onConfirmCreateCard}
              onCancel={this.onCancelCreateCard}
            />
            : null
        }
      </div>
    );
  }

  onClickAddCard() {
    this.setState({
      creatingCard: true
    });
  }

  onConfirmCreateCard(card) {
    console.log(card);
  }

  onCancelCreateCard() {
    this.setState({
      creatingCard: false
    });
  }

}

export default CardsPage;
