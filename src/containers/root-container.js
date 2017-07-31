import {Container} from 'flux/utils';
import RootView from '../view/root';
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

export default Container.createFunctional(RootView, getStores, getState);
