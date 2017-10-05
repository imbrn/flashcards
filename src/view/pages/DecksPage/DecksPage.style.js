const stylesheets = (theme) => {
  return {
    root: {
      background: theme.palette.background.default,
      height: '100%',
      boxSizing: 'border-box',
      [theme.breakpoints.up('xs')]: { paddingTop: 60 },
      [theme.breakpoints.up('sm')]: { paddingTop: 68 }
    },

    decksItems: {
      display: 'flex'
    },

    noDecksItems: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
};

export default stylesheets;
