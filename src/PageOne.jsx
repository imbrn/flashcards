import React, { Component } from 'react';
import { auth } from 'firebase';

class PageOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
    auth().signInAnonymously();
  }

  render() {
    if (this.state.user) {
      return <div>Signed in.</div>;
    } else {
      return <div>Signin in...</div>;
    }
  }

}

export default PageOne;
