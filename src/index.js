import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
