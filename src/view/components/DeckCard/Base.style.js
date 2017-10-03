/*
Deck card base styles.
*/
const stylesheets = (theme) => {
  return {
    root: theme.mixins.gutters({
      position: 'relative',
      height: 160,
      width: 240,
      boxSizing: 'border-box',
      margin: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }),
    text: {
      fontFamily: theme.typography.fontFamily
    },
    name: {
      fontWeight: 600,
      fontSize: theme.typography.fontSize * 1.5
    },
    description: {
      fontSize: theme.typography.fontSize
    },
    toolbar: {
      position: 'absolute',
      '&.t': { top: 0 },
      '&.b': { bottom: 0 },
      '&.l': { left: 0 },
      '&.r': { right: 0 }
    }
  };
};

export default stylesheets;
