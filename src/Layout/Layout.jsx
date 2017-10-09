import React from 'react';
import { withStyles } from 'material-ui/styles';
import routes from './routes';
import Topbar from './Topbar';
import Content from './Content';
import stylesheets from './Layout.style';

function Layout(props) {
  return (
    <div className={props.classes.root}>
      <Topbar routes={routes} />
      <Content routes={routes} />
    </div>
  );
}

export default withStyles(stylesheets)(Layout);
