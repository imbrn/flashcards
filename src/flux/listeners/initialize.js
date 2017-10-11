import AuthListener from './AuthListener';
import DecksListener from './DecksListener';

const listeners = [
  new AuthListener(),
  new DecksListener(),
];

function initialize() {
  listeners.forEach(listener => {
    listener.start();
  });
}

export default initialize;
