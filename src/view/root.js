import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, createPalette } from 'material-ui/styles';
import { blueGrey, deepPurple } from 'material-ui/colors';
import Main from './main';

/*
Application theme.
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
      default: "#f3f3f3"
    }
  }
}

/**
 * Application root.
 */
export default function(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Main {...props} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
