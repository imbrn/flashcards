import { Record } from 'immutable';

const CardModel = Record({
  id: null,
  deck: null,
  front: null,
  back: null,
  createTime: null,
  updateTime: null,
});

export default CardModel;
