import React from 'react';
import Deck from '../components/Deck';
import DeckModel from '../DeckModel';

const fakeModel = DeckModel({
  id: 1,
  name: 'One',
  description: 'This is the deck one. It has a bit large description for testing purposes'
});

const DecksPage = () => {
  return (
    <div>
      <Deck model={fakeModel} />
    </div>
  );
};

export default DecksPage;
