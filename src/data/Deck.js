import { Record, List } from 'immutable';

const Deck = Record({
  id: null,
  name: null,
  description: null,
  cards: List(),
  createTime: null,
  updateTime: null,
});

export default Deck;
