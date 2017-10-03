import initializeServices from './services/initialize';
import initializeListeners from './listeners/initialize';

/*
 * Initialize the application.
 */
function initialize() {
  initializeServices();
  initializeListeners();
}

export default initialize;
