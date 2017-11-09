import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Root;
