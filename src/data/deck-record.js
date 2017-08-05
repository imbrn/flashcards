import { Record, List } from 'immutable';

/**
 * Deck record.
 */
const Deck = Record({
  id: 0,
  name: '',
  description: '',
  cards: List()
});

/**
 * Card record.
 */
const Card = Record({
  front: '',
  back: ''
});

export default Deck;
export {
  Card
};
