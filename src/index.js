import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import initializeFirebase from './firebase/initialize';
import App from './App';

registerServiceWorker();
initializeFirebase();

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
