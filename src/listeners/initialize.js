import AuthStateChangeListener from './AuthStateChangeListener';

/*
 * Listeners list.
 */
const listeners = [
  new AuthStateChangeListener()
];

/*
 * Initializes all listeners.
 */
function initialize() {
  listeners.forEach(it => {
    if (it.listen)
      it.listen();
  });
}

export default initialize;
