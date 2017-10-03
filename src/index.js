import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import initialize from './initialize.js';

registerServiceWorker();
initialize();

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
