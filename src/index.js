import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Example from './Example';

render(
  React.createElement(Example),
  document.getElementById('root')
);
