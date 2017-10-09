import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey, deepPurple } from 'material-ui/colors';
import Layout from './Layout';

/*
Custom application theme
*/
let theme = createMuiTheme({
  palette: {
    primary: {
      ...blueGrey
    },
    secondary: {
      ...deepPurple
    }
  }
});

theme = {
  ...theme,
  palette: {
    ...theme.palette,
    background: {
      ...theme.palette.background,
      default: '#f3f3f3'
    }
  }
};

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
 
}

export default App;
