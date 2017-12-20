import { Record } from "immutable";

export const DeckItem = Record({
  id: null,
  name: null,
  description: null,
  front: null,
  back: null,
  createTime: null,
  updateTime: null,
  fromCache: false,
  hasPendingWrites: false
});
