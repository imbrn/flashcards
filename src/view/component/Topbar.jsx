import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Routes from '../page/routes';

/*
Stylesheet.
*/
const stylesheet = (theme) => {
  return {
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit * 3
    }
  };
};

/**
 * Application topbar.
 */
class Topbar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.title}>
            {this.mapTitleRoutes()}
          </Typography>
          {this.mapActionsRoutes()}
        </Toolbar>
      </AppBar>
    );
  }

  mapTitleRoutes() {
    return Routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.title} />;
    });
  }

  mapActionsRoutes() {
    return Routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.actions} />;
    });
  }

}

const StyledTopbar = withStyles(stylesheet)(Topbar);

export default StyledTopbar;
