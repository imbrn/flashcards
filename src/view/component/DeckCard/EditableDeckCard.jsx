import React from 'react';
import { withStyles } from 'material-ui/styles';
import DeckCard from './DeckCard';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done';
import CloseIcon from 'material-ui-icons/Close';

/* Stylesheets */
const stylesheets = () => {
  return {
    input: {
      padding: 0
    }
  };
};

/**
 * Editable deck card component.
 */
function EditableDeckCard(props) {
  const { classes, ...rest } = props;
  return (
    <DeckCard {...rest}
      name={<Name classes={classes} />}
      description={<Description classes={classes} />}
      toolbox={<Buttons classes={classes} />}
    />
  );
}

/* Name component */
function Name(props) {
  const classes = { input: props.classes.input };
  return <Input classes={classes} placeholder='Name' disableUnderline />;
}

/* Description component */
function Description(props) {
  const classes = { input: props.classes.input };
  return <Input multiline classes={classes} placeholder='Description' disableUnderline />;
}

/* Buttons component */
function Buttons(props) {
  return (
    <div>
      <IconButton><CloseIcon/></IconButton>
      <IconButton color='accent'><DoneIcon/></IconButton>
    </div>
  );
}

export default withStyles(stylesheets)(EditableDeckCard);
