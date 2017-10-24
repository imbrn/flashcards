import 'firebase/firestore';
import { initializeApp, firestore } from 'firebase';
import config from './config';

export default function() {
  initializeApp(config); 
  firestore().enablePersistence();
}

