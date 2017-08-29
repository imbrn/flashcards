import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import DoubleFaceCard from './DoubleFaceCard';
import Paper from 'material-ui/Paper';

/*
Stylesheets.
*/
const stylesheets = (theme) => {
  return {
    text: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 22
    },
    face: {
      cursor: 'default',
      height: '100%',
      position: 'relative'
    },
    placeholder: {
      position: 'absolute',
      top: theme.spacing.unit,
      left: theme.spacing.unit,
      color: theme.palette.text.hint,
      fontSize: theme.typography.fontSize
    },
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
};

/**
 * Card component.
 */
function Card(props) {
  const { classes, className, front, back,
    frontPlaceholder = 'Front',
    backPlaceholder = 'Back',
    ...rest } = props;
  return (
    <DoubleFaceCard className={className} {...rest}
      front={<Face placeholder={frontPlaceholder} classes={classes}>{front}</Face>}
      back={<Face placeholder={backPlaceholder} classes={classes}>{back}</Face>}
    />
  );
}

/*
Face component.
*/
function Face(props) {
  return (
    <div className={props.classes.face}>
      <Placeholder classes={props.classes}>{props.placeholder}</Placeholder>
      <Content classes={props.classes}>{props.children}</Content>
    </div>
  );
}

/* Placeholder component. */
function Placeholder(props) {
  return (
    <span className={classnames(props.classes.placeholder, props.classes.text)}>
      {props.children}
    </span>
  );
}

/* Face content component. */
function Content(props) {
  return (
    <Paper className={classnames(props.classes.content, props.classes.text)}>
      {props.children}
    </Paper>
  );
}

export default withStyles(stylesheets)(Card);
