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
    },
    multiline: {
      padding: 0
    }
  };
};

/**
 * Editable deck card component.
 */
class EditableDeckCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    this.nameInputRef.focus();
  }

  render() {
    const { classes } = this.props;
    return (
      <DeckCard 
        onKeyUp={this.processKey.bind(this)}
        name={this.renderName(classes)}
        description={this.renderDescription(classes)}
        toolbox={this.renderButtons(classes)}
      />
    );
  }

  processKey(e) {
    switch (e.keyCode) {
    case 27: return this.processEsc(e);
    case 13: return this.processEnter(e);
    }
  }

  processEsc() {
    this.cancel();
  }

  processEnter(e) {
    if (e.ctrlKey)
      this.done();
  }

  renderName(classes) {
    return (
      <Edit value={this.state.name}
        placeholder='Name'
        classes={classes}
        onChange={this.onChangeName.bind(this)}
        inputRef={(ref) => this.nameInputRef = ref} />
    );
  }

  renderDescription(classes) {
    return (
      <Edit value={this.state.description}
        placeholder='Description'
        classes={classes}
        onChange={this.onChangeDescription.bind(this)} />
    );
  }

  renderButtons(classes) {
    return <Buttons classes={classes}
      onCancelPerformed={this.onCancelPerformed.bind(this)}
      onDonePerformed={this.onDonePerformed.bind(this)}
    />;
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onCancelPerformed() {
    this.cancel();
  }

  onDonePerformed() {
    this.done();
  }

  cancel() {
    if (this.props.onCancel)
      this.props.onCancel(this);
  }

  done() {
    if (this.props.onDone)
      this.props.onDone({
        name: this.state.name,
        description: this.state.description
      }, this);
  }

}

/* Editable component */
function Edit(props) {
  const { value, placeholder, classes, ...rest } = props;
  return <Input {...rest} multiline disableUnderline
    value={value}
    classes={{ multiline: classes.multiline, input: classes.input }}
    placeholder={placeholder}
  />;
}

/* Buttons component */
function Buttons(props) {
  return (
    <div>
      <IconButton onClick={props.onCancelPerformed}><CloseIcon /></IconButton>
      <IconButton onClick={props.onDonePerformed} color='accent'><DoneIcon /></IconButton>
    </div>
  );
}

export default withStyles(stylesheets)(EditableDeckCard);
