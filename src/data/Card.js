import { Record } from 'immutable';

const Card = Record({
  id: null,
  front: null,
  back: null,
  progress: 0,
  bestProgress: 0,
  createTime: null,
  updateTime: null
});

export default Card;
