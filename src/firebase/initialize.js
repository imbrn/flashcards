import { firestore, initializeApp } from 'firebase';
import 'firebase/firestore';
import config from './config';

/**
 * Initializes the services.
 */
function initialize() {
  initializeApp(config);
  firestore().enablePersistence();
}

export default initialize;
