import { initializeApp } from 'firebase';
import config from './config';
import Auth from './auth/Auth';
import Decks from './decks/Decks';

/**
 * Initializes the services.
 */
function initialize() {
  initializeApp(config);

  // Initializes services
  Auth.initialize();
  Decks.initialize();
}

export default initialize;
