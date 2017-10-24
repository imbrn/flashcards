import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import './index.css';
import './icons/fontawesome/css/font-awesome.css';
import initializeFirebase from './firebase/initialize';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

initializeFirebase();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
