import { Record, List } from 'immutable';

const DeckModel = Record({
  id: null,
  name: null,
  description: null,
  front: null,
  back: null,
  cards: List(),
  createTime: null,
  updateTime: null,
});

export default DeckModel;
