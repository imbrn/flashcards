import { initializeApp } from 'firebase';
import config from './config';

export default function init() {
  initializeApp(config);
}
