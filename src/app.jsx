import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, createPalette } from 'material-ui/styles';
import { blueGrey, deepPurple } from 'material-ui/colors';
import Main from './view/main';

/*
Custom application theme
*/
let theme = createMuiTheme({
  palette: createPalette({
    primary: {
      ...blueGrey
    },
    accent: {
      ...deepPurple
    }
  })
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

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
