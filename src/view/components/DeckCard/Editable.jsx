import React from 'react';
import { withStyles } from 'material-ui/styles';
import DeckCardBase from './Base';
import Input from 'material-ui/Input';
import stylesheets from './Editable.style';

/**
 * Editable deck card.
 */
class EditableDeckCard extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.description = props.description;

    this.state = {
      name: props.name,
      description: props.description
    };
  }

  componentDidMount() {
    this.nameInputRef.focus();
  }

  render() {

    const nameEl = <Edit
      inputRef={(ref) => this.nameInputRef = ref}
      placeholder='Name'
      value={this.state.name}
      classes={this.props.classes}
      onChange={this.onChangeName.bind(this)} />;

    const descriptionEl = <Edit
      inputRef={(ref) => this.descriptionInputRef = ref}
      placeholder='Description'
      value={this.state.description ? this.state.description : undefined}
      classes={this.props.classes}
      onChange={this.onChangeDescription.bind(this)} />;

    return (
      <DeckCardBase {...this.filterBaseProps()}
        className={this.props.className}
        classes={{}}
        name={nameEl}
        description={descriptionEl}
        onKeyPress={this.onKeyPress.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)}
        onBlur={this.onBlur.bind(this)} />
    );

  }

  filterBaseProps() {
    const props = Object.assign({}, this.props);
    delete props.onCancel;
    delete props.onDone;
    delete props.onChangeName;
    delete props.onChangeDescription;
    return props;
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleEnterKey(e);
    }
  }

  handleEnterKey(e) {
    e.preventDefault();
    if (e.target === this.nameInputRef) {
      this.focusDescription();
    } else {
      this.finalizeEdition();
    }
  }

  onKeyUp(e) {
    if (e.key === 'Escape')
      this.cancel();
  }

  onBlur(e) {
    if (e.relatedTarget === this.nameInputRef
      || e.relatedTarget === this.descriptionInputRef)
      return;
    this.handleBlur();
  }

  handleBlur() {
    this.finalizeEdition();
  }

  hasChangedData(data) {
    return this.name !== data.name
      || this.description !== data.description;    
  }

  focusDescription() {
    this.descriptionInputRef.focus();
  }

  cancel() {
    if (this.props.onCancel)
      this.props.onCancel();
  }

  finalizeEdition() {
    const data = this.buildData();
    if (this.hasChangedData(data)) {
      this.onDone();
    } else {
      this.cancel();
    }
  }
  
  onDone() {
    if (this.props.onDone)
      this.props.onDone(this.buildData());
  }

  buildData() {
    const name = this.state.name ? this.state.name.trim() : null;
    const description = this.state.description ? this.state.description.trim() : null;
    return { name, description };
  }

}

/*
Editable text component.
*/
function Edit(props) {
  const classes = {
    root: props.classes.root,
    input: props.classes.input
  };

  return <Input {...props} disableUnderline multiline
    classes={classes}
    placeholder={props.placeholder}
    value={props.value}
  />;
}

export default withStyles(stylesheets)(EditableDeckCard);
