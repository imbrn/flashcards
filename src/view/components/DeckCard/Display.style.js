const stylesheets = (theme) => {
  return {
    root: {
      cursor: 'default'
    },
    cardsCount: theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    })
  };
};

export default stylesheets;
