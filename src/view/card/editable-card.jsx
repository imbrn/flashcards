import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card from './card';

/*
Stylesheets.
*/
const stylesheets = createStyleSheet('EditableCard', (theme) => {
  return {
    face: {
      height: '100%'
    },
    placeholder:{
      position: 'absolute',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize * .95,
      color: theme.palette.text.hint,
      top: theme.spacing.unit,
      left: theme.spacing.unit
    },
    edit: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      height: '100%',
      boxSizing: 'border-box',
      padding: theme.spacing.unit,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }
  };
});

/**
 * Editable card component.
 */
function EditableCard(props) {
  const { className, front, back, onFrontChange, onBackChange, classes,
    frontPlaceholder, backPlaceholder, ...rest} = props;
  return (
    <Card className={className} {...rest} classes={{face: classes.face}}
      front={<Face value={front} placeholder={frontPlaceholder} classes={classes} className={classes.front} onChange={onFrontChange} />}
      back={<Face value={back} placeholder={backPlaceholder} classes={classes} className={classes.back} onChange={onBackChange} />}
    />
  );
}

/*
Face component.
*/
function Face(props) {
  return (
    <div className={classnames(props.classes.face, props.className)}>
      <span className={props.classes.placeholder}>{props.placeholder}</span>
      <div className={props.classes.edit} contentEditable
        onBlur={(e) => onChange(props, e)}
        dangerouslySetInnerHTML={{ __html: props.value }}
      />
    </div>
  );
}

function onChange(props, element) {
  if (props.onChange)
    props.onChange(element.target.innerText, element);
}

export default withStyles(stylesheets)(EditableCard);
