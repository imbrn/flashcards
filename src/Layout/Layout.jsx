import React from 'react';
import routes from './routes';
import Topbar from './Topbar';
import Content from './Content';

function Layout() {
  return (
    <div>
      <Topbar routes={routes} />
      <Content routes={routes} />
    </div>
  );
}

export default Layout;
