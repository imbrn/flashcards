import LocalStorage, { MockLocalStorage } from './LocalStorage';
import config from '../../../config.js';

if (config.env === 'test') {
  window.localStorage = new MockLocalStorage();
}

export default new LocalStorage();
