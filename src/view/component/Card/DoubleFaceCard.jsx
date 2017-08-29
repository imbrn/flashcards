import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import './DoubleFaceCard.css';

/* Stylesheets */
const stylesheets = (theme) => {
  return {
    root: {
      position: 'relative'
    },
    menu: {
      position: 'absolute',
      top: theme.spacing.unit,
      right: theme.spacing.unit,
      zIndex: 2
    }
  };
};

/*
Double face card component.
*/
function DoubleFaceCard(props) {
  const { classes={}, className, animated=true,
    front, back, reversed,
    menu='', showMenu=false, menuClass = '',
    ...rest } = props;
  return (
    <Root reversed={reversed} animated={animated} className={className} classes={classes} {...rest}>
      <Menu className={menuClass} classes={classes} show={showMenu}>{menu}</Menu>
      <Flipper classes={classes} >
        <Front classes={classes}>{front}</Front>
        <Back classes={classes}>{back}</Back>
      </Flipper>
    </Root>
  );
}

/*
Root component.
*/
function Root(props) {
  const { reversed, animated, className, classes, children, ...rest } = props;
  const faceClass = reversed ? 'back' : 'front';
  const animatedClass = animated ? 'animated' : '';
  return (
    <div className={classnames('DoubleFaceCard-root', className, classes.root, faceClass, animatedClass)} {...rest}>
      {children}
    </div>
  );
}

/*
Menu component.*
*/
function Menu(props) {
  if (props.show) {
    return (
      <div className={classnames(props.className, props.classes.menu)}>
        {props.children}
      </div>
    );
  } else {
    return null;
  }
}

/*
Flipper component.
*/
function Flipper(props) {
  return (
    <div className={classnames('DoubleFaceCard-flipper', props.classes.flipper)}>
      {props.children}
    </div>
  );
}

/*
Front face component.
*/
function Front(props) {
  return (
    <Face className={classnames('DoubleFaceCard-front', props.classes.front)} {...props}>
      {props.children}
    </Face>
  );
}

/*
Back face component.
*/
function Back(props) {
  return (
    <Face className={classnames('DoubleFaceCard-back', props.classes.back)} {...props}>
      {props.children}
    </Face>
  );
}

/*
Face abstraction component.
*/
function Face(props) {
  return (
    <div className={classnames('DoubleFaceCard-face', props.classes.face, props.className)}>
      {props.children}
    </div>
  );
}

export default withStyles(stylesheets)(DoubleFaceCard);
