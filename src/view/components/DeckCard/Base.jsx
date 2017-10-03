import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import stylesheets from './Base.style';

/**
 * Deck card.
 */
function DeckCardBase(props) {
  const { className, name, description, classes, topRight, bottomLeft, bottomRight, ...rest } = props;
  return (
    <Root className={className} {...rest} classes={classes}>
      <Name classes={classes}>{name}</Name>
      <Description classes={classes}>{description}</Description>
      {topRight ? <Tooolbar pos={['t', 'r']} classes={classes}>{topRight}</Tooolbar> : null}
      {bottomLeft ? <Tooolbar pos={['b', 'l']} classes={classes}>{bottomLeft}</Tooolbar> : null}
      {bottomRight ? <Tooolbar pos={['b', 'r']} classes={classes}>{bottomRight}</Tooolbar> : null}
    </Root>
  );
}

/*
Root of the deck card.
*/
function Root(props) {
  return (
    <Paper {...props} classes={{}} className={classnames(props.className, props.classes.root)}>
      {props.children}
    </Paper>
  );
}

/*
Name part of the deck card.
*/
function Name(props) {
  return (
    <Text classes={props.classes} className={props.classes.name}>
      {props.children}
    </Text>
  );
}

/*
Description part of the deck card.
*/
function Description(props) {
  return (
    <Text classes={props.classes} className={props.classes.description}>
      {props.children}
    </Text>
  );
}

/*
Card top right section.
*/
function Tooolbar(props) {
  return (
    <div className={classnames(props.classes.toolbar, props.pos)}>
      {props.children}
    </div>
  );
}

/*
Text field.
*/
function Text(props) {
  const classNames = classnames(props.classes.text, props.className);
  return (
    <FormControl fullWidth className={classNames}>
      {props.children}
    </FormControl>
  );
}

export default withStyles(stylesheets)(DeckCardBase);
