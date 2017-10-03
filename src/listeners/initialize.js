import AuthListeners from './AuthListeners';
import DecksListeners from './DecksListeners';

/*
 * Initializes all listeners.
 */
function initialize() {
  AuthListeners.initialize();
  DecksListeners.initialize();
}

export default initialize;
