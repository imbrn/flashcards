const stylesheets = (theme) => {
  return {
    root: theme.mixins.gutters({
      display: 'flex',
      flexDirection: 'column',
      fontFamily: theme.typography.fontFamily,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }),
    text: {
      padding: 0
    },
    name: {
      fontWeight: 'bold',
      fontSize: 18
    },
    description: {
      fontSize: 14,
      marginTop: theme.spacing.unit / 2,
      flexGrow: 1
    }
  }
};

export default stylesheets;
