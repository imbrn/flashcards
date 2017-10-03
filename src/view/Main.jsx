import React from 'react';
import routes from './routes';
import { Route } from 'react-router';
import { withStyles } from 'material-ui/styles';
import stylesheets from './Main.style';
import TopBar from './components/TopBar';

/**
 * Application main.
 */
function Main(props) {
  return (
    <div className={props.classes.root}>{props.children}
      <TopBar/>
      <div className={props.classes.page}>
        {routes.map((route, index) => <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.page}
        />)}
      </div>
    </div>
  );
}

export default withStyles(stylesheets)(Main);
