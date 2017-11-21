import React from 'react';
import { render } from 'react-dom';
import './tailwindcss/tailwind.scss';
import './index.css';
import Main from './Main';

render(
  React.createElement(Main),
  document.getElementById('root')
);
