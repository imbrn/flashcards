import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../routes';
import { auth } from 'firebase';

class Main extends React.Component {

  state = {
    user: null,
  };

  componentWillMount() {
    this._signIn();
  }

  _signIn() {
    auth().onAuthStateChanged(user => this.setState({ user }));
    auth().signInAnonymously();
  }

  render() {
    if (this.state.user) {
      return (
        <BrowserRouter>
          <div>
            { this._renderRoutes() }
          </div>
        </BrowserRouter>
      );
    } else {
      return 'Loading...';
    }
  }

  _renderRoutes() {
    return routes.map((route, index) => 
      <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
    );
  }

}

export default Main;
