const stylesheets = (theme) => {
  return {
    root: theme.mixins.gutters({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: 160,
      minHeight: 110,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      fontFamily: theme.typography.fontFamily
    }),
    menu: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    name: {
      fontSize: 18,
      fontWeight: 600
    },
    description: {
      fontSize: 14,
      flexGrow: 1,
      marginTop: theme.spacing.unit / 2
    },
    cardsCount: {
      fontSize: 12,
      color: theme.palette.text.hint
    }
  }
};

export default stylesheets;
