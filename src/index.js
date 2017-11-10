import React from 'react';
import { render } from 'react-dom';
import { initialize as initFirebase } from './firebase';
import '../bulma/bulma.scss';
import Root from './Root';

// Intialize firebase
initFirebase();

render(
  React.createElement(Root),
  document.getElementById('root')
);

