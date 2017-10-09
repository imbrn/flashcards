import AuthListener from './AuthListener';
import DecksListener from './DecksListener';
import CardsListener from './CardsListener';

const listeners = [
  new AuthListener(),
  new DecksListener(),
  new CardsListener()
];

function initialize() {
  listeners.forEach(listener => {
    listener.start();
  });
}

export default initialize;
