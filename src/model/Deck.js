import { Record, OrderedMap } from 'immutable';

export default Record({
  id: null,
  name: null,
  description: null,
  cards: OrderedMap(),
  createTime: null,
  updateTime: null
});
