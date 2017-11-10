import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PageOne = ({ counter, increment, decrement }) => {
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageOne);
