import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PageOne from './PageOne';

const App = () => {
  return (
    <div>
      <Route path='/one' component={PageOne} />
      <Route path='/' exact={true} component={() => <Redirect to='/one' />} />
    </div>
  );
};

export default App;
