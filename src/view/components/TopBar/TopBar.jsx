import React from 'react';
import Title from './Title';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button'; 
import stylesheets from './TopBar.style';
import AuthenticatedUserStore from '../../../stores/AuthenticatedUserStore';

/**
 * Application top bar.
 */
class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: AuthenticatedUserStore.getState()
    };
  }

  componentWillMount() {
    this.removeAuthenticatedUserStoreListener =
      AuthenticatedUserStore.addListener(() => this.onUpdateAuthenticatedUserStore());
  }

  componentWillUnmount() {
    this.removeAuthenticatedUserStoreListener();
  }

  onUpdateAuthenticatedUserStore() {
    this.setState({
      user: AuthenticatedUserStore.getState()
    });
  }

  render() {
    const props = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className={props.classes.toolbar}>
          <Title className={props.classes.title}/>
          <SignInButton user={this.state.user} />
        </Toolbar>
      </AppBar>
    );
  }

}

/*
 * Login button.
 */
function SignInButton(props) {
  if (!props.user || props.user.isAnonymous) {
    return (
      <Button color="inherit">Sign In</Button>
    );
  } else {
    return null;
  }
}

export default withStyles(stylesheets)(TopBar);
