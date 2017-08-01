import {Container} from 'flux/utils';
import AppView from '../view/app';
import DecksStore from '../data/decks-store'

function getStores() {
  return [
    DecksStore
  ];
}

function getState() {
  return {
    decks: DecksStore.getState()
  };
}

export default Container.create(AppView, getStores, getState);
