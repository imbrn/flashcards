import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

/*
Stylesheets.
*/
const stylesheet = (theme) => {
  return {
    deckItem: theme.mixins.gutters({
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      height: 120,
      width: '100%',
      boxSizing: 'border-box',
      [theme.breakpoints.up(528)]: { width: 240, height: 160 },
      [theme.breakpoints.up(601)]: { width: 260, height: 160 },
      [theme.breakpoints.up(701)]: { width: 300, height: 160 },
    }),
    deckDescription: {
      flexGrow: 1
    },
  };
};

/**
 * Represents a deck item exhibited in the decks page.
 */
function DeckItem(props) {
  const { classes, deck, ...rest } = props;
  return (
    <Paper className={classes.deckItem} {...rest}>
      <Typography type="title">{deck.name}</Typography>
      <Typography type="body1" className={classes.deckDescription}>{deck.description}</Typography>
      <Typography type="caption">{deck.cards.size} cards.</Typography>
    </Paper>
  );
}

export default withStyles(stylesheet)(DeckItem);
