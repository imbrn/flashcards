import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';

/* Stylesheets */
const stylesheets = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing.unit,
      [theme.breakpoints.up(528)]: { width: 240, height: 160 },
      [theme.breakpoints.up(601)]: { width: 260, height: 160 },
      [theme.breakpoints.up(701)]: { width: 300, height: 160 },
    },
    content: theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      boxSizing: 'border-box',
      flexGrow: 1
    }),
    name: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 20,
      fontWeight: 600
    },
    description: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
    }
  };
};

/**
 * Deck card.
 */
function DeckCard(props) {
  return (
    <Root classes={props.classes}>
      <Content classes={props.classes}>
        <Name classes={props.classes}>{props.name}</Name>
        <Description classes={props.classes}>{props.description}</Description>
      </Content>
      <Toolbox classes={props.classes}>{props.toolbox}</Toolbox>
    </Root>
  );
}

/* Root component */
function Root(props) {
  return (
    <Paper className={props.classes.root}>{props.children}</Paper>
  );
}

/* Content area */
function Content(props) {
  return (
    <div className={props.classes.content}>
      {props.children}
    </div>
  );
}

/* Name component */
function Name(props) {
  return (
    <FormControl fullWidth className={props.classes.name}>
      {props.children}
    </FormControl>
  );
}

/* Description component */
function Description(props) {
  return (
    <FormControl fullWidth className={props.classes.description}>
      {props.children}
    </FormControl>
  );
}

/* Toolbox component */
function Toolbox(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default withStyles(stylesheets)(DeckCard);
