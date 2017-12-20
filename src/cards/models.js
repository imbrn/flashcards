import { Record } from "immutable";

export const CardItem = Record({
  id: null,
  deckId: null,
  front: null,
  back: null,
  createTime: null,
  updateTime: null,
  fromCache: false,
  hasPendingWrites: false
});
