import { Record, OrderedMap } from "immutable";

export class DeckModel extends Record({
  id: null,
  name: null,
  description: null,
  front: null,
  back: null,
  cards: OrderedMap(),
  createTime: null,
  updateTime: null
}) {
  asUpdatableModel() {
    return {
      name: this.name,
      description: this.description,
      front: this.front,
      back: this.back
    };
  }
}

export const CardModel = Record({
  id: null,
  deck: null,
  front: null,
  back: null,
  createTime: null,
  updateTime: null
});

export const DecksInitialLoadingState = {
  NOT_LOADED: "NOT_LOADED",
  LOADING: "LOADING",
  LOADED: "LOADED"
};
