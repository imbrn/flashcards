import React from 'react';
import { Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <div>
      <h1>Page one</h1>
      <Link to='/two'>Go to page two</Link>
    </div>
  );
};

export default PageOne;
