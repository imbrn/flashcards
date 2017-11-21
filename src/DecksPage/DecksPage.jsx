import React from 'react';
import Deck from './components/Deck';
import DeckModel from './DeckModel';

const fakeModel = DeckModel({
  id: 1,
  name: 'Deck name',
  description: 'Deck description, which is bit larger for testing purposes'
});

const DecksPage = () => {
  return (
    <div>
      <Deck model={fakeModel} />
      <Deck model={fakeModel} />
    </div>
  );
};

export default DecksPage;
