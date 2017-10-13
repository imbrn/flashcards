import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import initializeFirebase from './firebase/initialize';
import App from './App';
import { auth } from 'firebase';
import AuthenticationActions from './flux/actions/AuthenticationActions';

registerServiceWorker();
initializeFirebase();

// Global sign in listener
auth().onAuthStateChanged(user => {
  if (user) {
    AuthenticationActions.signIn(user);
  } else {
    AuthenticationActions.signOut();
  }
});

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
