const stylesheets = (theme) => {
  return {
    root: {
      position: 'relative',
      height: '100%'
    },
    decks: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      padding: theme.spacing.unit,
      boxSizing: 'border-box',
    },
    deck: {
      width: 190,
      height: 140,
      margin: theme.spacing.unit,
      boxSizing: 'border-box',
      [theme.breakpoints.down(432)]: {
        width: '100%'
      },
      [theme.breakpoints.up(767)]: {
        width: 234
      }
    },
    actionButton: {
      position: 'absolute',
      right: theme.spacing.unit * 4,
      bottom: theme.spacing.unit * 3
    }
  }
};

export default stylesheets;
