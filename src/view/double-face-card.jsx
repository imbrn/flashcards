import React from 'react';
import classnames from 'classnames';
import './double-face-card.css';

/*
Double face card component.
*/
function DoubleFaceCard(props) {
  const { classes, className, front, back, face } = props;
  const rootClasses = classnames('DoubleFaceCard-root', className, face, animatedClass(props),
    extract(classes, 'root'));
  const flipperClasses = classnames('DoubleFaceCard-flipper', extract(classes, 'flipper'));
  const frontClasses = classnames('DoubleFaceCard-front', extract(classes, 'front'));
  const backClasses = classnames('DoubleFaceCard-back', extract(classes, 'back'));
  
  return (
    <div className={rootClasses} {...events(props)}>
      <div className={flipperClasses}>
        <div className={frontClasses}>{renderFace(front)}</div>
        <div className={backClasses}>{renderFace(back)}</div>
      </div>
    </div>
  );
}

function renderFace(face) {
  if (typeof face === 'function') {
    const Face = face;
    return <Face/>;
  } else {
    return face;
  }
}

function animatedClass(props) {
  return props.animated || props.animated === undefined ? 'animated' : '';
}

/*
Expand events from props.
*/
function events(props) {
  return {
    onClick: props.onClick,
    onMouseOver: props.onMouseOver,
    onMouseOut: props.onMouseOut
  };
}

/*
Utilitary to extract class from classes.
*/
function extract(classes, name) {
  return classes ? classes[name] : '';
}

export default DoubleFaceCard;
