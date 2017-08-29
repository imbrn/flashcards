import React from 'react';
import { withStyles } from 'material-ui/styles';
import DeckCard from './DeckCard';
import Typography from 'material-ui/Typography';

/* Stylesheets */
const stylesheets = (theme) => {
  return {
    cardsCount: theme.mixins.gutters({
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 2
    })
  };
};

/**
 * Display deck card component.
 */
function DisplayDeckCard(props) {
  const { classes, cardsCount, ...rest } = props;
  return (
    <DeckCard {...rest}
      toolbox={<CardsCount classes={classes} count={cardsCount} />}
    />
  );
}

/* Cards count component */
function CardsCount(props) {
  return (
    <div className={props.classes.cardsCount}>
      <Typography type='caption'>
        {props.count} cards.
      </Typography>
    </div>
  );
}

export default withStyles(stylesheets)(DisplayDeckCard);
