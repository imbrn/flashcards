import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

/**
 * Application topbar.
 */
class Topbar extends React.Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit">{this.props.title}</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Topbar;
