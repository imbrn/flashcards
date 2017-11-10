import config from './config';
import { initializeApp } from 'firebase';

export function initialize() {
  initializeApp(config);
};
