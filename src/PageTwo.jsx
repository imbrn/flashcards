import React from 'react';
import { Link } from 'react-router-dom';

const PageTwo = () => {
  return (
    <div>
      <h1>Page two</h1>
      <Link to='/one'>Go to page one</Link>
    </div>
  );
};

export default PageTwo;
