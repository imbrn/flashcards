import React from 'react';

const HelloWorld = ({ color = 'blue', ...rest }) => {
  return (
    <div style={{ color }} {...rest}>
      Hello world with React component!
    </div>
  );
};

export default HelloWorld;
