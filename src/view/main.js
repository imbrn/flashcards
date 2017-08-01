import React from 'react';
import { Route } from 'react-router-dom';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Routes from './routes';
import Topbar from './topbar';
import DecksStore from '../data/decks-store';

/*
Stylesheets.
*/
const stylesheet = createStyleSheet('Main', (theme) => {
  return {
    root: {
      background: theme.palette.background.default,
      height: '100%',
      display: 'flex'
    },
    content: {
      flexGrow:1,
      paddingTop: 60
    },
    [theme.breakpoints.up("sm")]: {
      content: {
        paddingTop: 70
      }
    }
  };
});

/**
 * Main view.
 */
class Main extends React.Component {

  static getStores() {
    return [
      DecksStore
    ];
  }

  static calculateState() {
    return {
      decks: DecksStore.getState()
    }
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Topbar />
        <div className={this.props.classes.content}>
          {this.mapContentRoutes()}
        </div>
      </div>
    );
  }

  mapContentRoutes() {
    return Routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.page} />
    });
  }

}

const StyledMain = withStyles(stylesheet)(Main);

export default StyledMain;
