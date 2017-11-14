import React from 'react';
import { render } from 'react-dom';
import initFirebase from './firebase/init';
import './bulma/bulma.scss';
import './index.css';
import Root from './Root';

// Intialize firebase
initFirebase();

render(
  React.createElement(Root),
  document.getElementById('root'),
);

