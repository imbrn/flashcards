import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld';

render(
  React.createElement(HelloWorld),
  document.getElementById('root')
);

