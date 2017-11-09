import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld';
import '../bulma/bulma.scss';

render(
  React.createElement(HelloWorld),
  document.getElementById('root')
);

