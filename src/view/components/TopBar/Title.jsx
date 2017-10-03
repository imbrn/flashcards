import React from 'react';
import { Route } from 'react-router';
import routes from '../../routes';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';

/**
 * TopBar title.
 */
function Title(props) {
  const classesNames = classnames(props.className);
  return (
    <Typography className={classesNames} type="title" color="inherit">
      {routes.map((route, index) => <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.title}
      />)}
    </Typography>
  );
}

export default Title;
