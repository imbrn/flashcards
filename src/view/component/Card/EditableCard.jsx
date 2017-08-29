import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card from './Card';

/*
Stylesheets.
*/
const stylesheets = () => {
  return {
    edit: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
};

/**
 * Editable card component.
 */
function EditableCard(props) {
  const { className, classes,
    front, back,
    onFrontChange, onBackChange,
    ...rest } = props;
  return (
    <Card className={className} {...rest} classes={{ face: classes.face }}
      front={<Face value={front} classes={classes} className={classes.front} onChange={onFrontChange} />}
      back={<Face value={back} classes={classes} className={classes.back} onChange={onBackChange} />}
    />
  );
}

/*
Face component.
*/
function Face(props) {
  return (
    <div className={props.classes.edit} contentEditable
      onBlur={(e) => onChange(props, e)}
      dangerouslySetInnerHTML={{ __html: props.value }}
    />
  );
}

function onChange(props, element) {
  if (props.onChange)
    props.onChange(element.target.innerText, element);
}

export default withStyles(stylesheets)(EditableCard);
