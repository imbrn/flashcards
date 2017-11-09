import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const App = () => {
  return (
    <div>
      <Route path='/one' component={PageOne} />
      <Route path='/two' component={PageTwo} />
      <Route path='/' exact={true} component={() => <Redirect to='/one' />} />
    </div>
  );
};

export default App;
