import { Record, OrderedMap } from 'immutable';

const Deck = Record({
  id: null,
  name: null,
  description: null,
  cards: OrderedMap(),
  createTime: null,
  updateTime: null
});

export default Deck;
