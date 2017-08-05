import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './app';

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
registerServiceWorker();
