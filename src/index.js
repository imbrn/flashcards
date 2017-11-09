import React from 'react';
import { render } from 'react-dom';
import '../bulma/bulma.scss';
import Root from './Root';

render(
  React.createElement(Root),
  document.getElementById('root')
);

