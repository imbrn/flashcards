import React from 'react';
import './HelloWorld.css';

const HelloWorld = ({ color = 'blue', ...rest }) => {
  return (
    <div className='HelloWorld' style={{ color }} {...rest}>
      Hello world with React component!
    </div>
  );
};

export default HelloWorld;
