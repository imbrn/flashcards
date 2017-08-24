import React from 'react';
import classnames from 'classnames';
import './double-face-card.css';

/*
Double face card component.
*/
function DoubleFaceCard(props) {
  const { className, front, back, face, classes={}, animated=true } = props;
  return (
    <Card face={face} animated={animated} className={className} classes={classes}>
      <Flipper classes={classes} >
        <Front classes={classes}>{front}</Front>
        <Back classes={classes}>{back}</Back>
      </Flipper>
    </Card>
  );
}

/*
Root component.
*/
function Card(props) {
  const { className, classes, children } = props;
  const animated = props.animated ? 'animated' : '';
  const face = props.face ? props.face : 'front';
  return (
    <div className={classnames('DoubleFaceCard-root', className, classes.root, face, animated)}>
      {children}
    </div>
  );
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

export default DoubleFaceCard;
