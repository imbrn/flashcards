import React from 'react';
import './HelloWorld.css';

const HelloWorld = (props) => {
  return (
    <div className='HelloWorld' {...props}>
      <button className='button is-large'>
        Hey!
      </button>
      <button className='button is-large is-primary'>
        Hey!
      </button>
      <button className='button is-large is-danger'>
        Hey!
      </button>
      <button className='button is-large is-info'>
        Hey!
      </button>
    </div>
  );
};

export default HelloWorld;
