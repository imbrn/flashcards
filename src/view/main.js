import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import Topbar from './topbar';
import DecksPage from './decks-page';

/*
Stylesheets.
*/
const stylesheet = createStyleSheet('Main', (theme) => {
  return {
    root: {
      height: "100%",
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      paddingTop: 70,
      background: theme.palette.background.default
    }
  };
});

/**
 * Main.
 */
class Main extends React.Component {

  render() {
    return (
      <div className={this.props.classes.root}>
        <Topbar title="Flashcards" />
        {this.renderContentRoutes()}
      </div>
    );
  }

  renderContentRoutes() {
    return (
      <Switch>
        <Route path='/decks' component={(props) => <DecksPage {...this.props} {...props} />} />
        <Route path='/' component={() => <Redirect to='decks' />} />
      </Switch>
    );
  }

}

export default withStyles(stylesheet)(Main);
