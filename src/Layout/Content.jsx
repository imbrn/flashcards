import React from 'react';
import { Route } from 'react-router-dom';

function Content({ routes }) {
  return routes.map((route, index) => 
    <Route
      key={index}
      path={route.path}
      component={route.component}
      exact={route.exact}
    />
  );
}

export default Content;
