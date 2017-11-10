import React, { Component } from 'react';
import { auth } from 'firebase';
import { Map } from 'immutable';

class PageOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    auth().onAuthStateChanged(user => {
      this.setState({
        user: Map({ 
          ...user.toJSON(),
          displayName: user.isAnonymous ? 'Anonymous' : user.displayName
        })
      });
    });
    auth().signInAnonymously();
  }

  render() {
    if (this.state.user) {
      return (
        <button className='button is-primary'>
          Signed in as {this.state.user.displayName}
        </button>
      );
    } else {
      return <div>Signin in...</div>;
    }
  }

}

export default PageOne;
