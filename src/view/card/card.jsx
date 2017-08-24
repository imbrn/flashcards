import React from 'react';
import DoubleFaceCard from './double-face-card';
import Paper from 'material-ui/Paper';
import { createStyleSheet, withStyles } from 'material-ui/styles';

/*
Stylesheets.
*/
const stylesheets = createStyleSheet('Card', () => {
  return {
    face: {
      height: '100%'
    }
  };
});

/**
 * Card component.
 */
function Card(props) {
  const { className, front, back, classes, ...rest } = props;
  return (
    <DoubleFaceCard className={className} {...rest}
      front={<Face className={classes.face}>{front}</Face>}
      back={<Face className={classes.face}>{back}</Face>}
    />
  );
}

/*
Face component.
*/
function Face(props) {
  return (
    <Paper className={props.className}>
      {props.children}
    </Paper>
  );
}

export default withStyles(stylesheets)(Card);
