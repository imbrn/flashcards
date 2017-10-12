import React from 'react';
import { withStyles } from 'material-ui/styles';
import stylesheets from './Edit.style';
import classnames from 'classnames';
import Deck from '../../data/Deck';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck ? props.deck : Deck()
    };
  }

  componentDidMount() {
    this.initValidations();
  }

  initValidations() {
    this.components = [
      { name: 'name', ref: this.nameRef },
      { name: 'description', ref: this.descriptionRef }
    ];
  }

  render() {
    const props = this.props;
    const autoFocus = props.autoFocus;
    const classes = {
      root: classnames(props.classes.root, props.rootClass, props.className),
      name: classnames(props.classes.text, props.classes.name, props.nameClass),
      description: classnames(props.classes.text, props.classes.description, props.descriptionClass)
    };

    return (
      <Paper className={classes.root}>
        <Input autoFocus={autoFocus} multiline disableUnderline className={classes.name} 
          inputRef={(ref) => this.nameRef = ref }
          placeholder="Name" value={this.state.deck.name}
          onChange={this.nameInputChanged.bind(this)}
          onKeyPress={this.keyPressed.bind(this)}
          onKeyUp={this.keyUp.bind(this)}/>
        <Input multiline disableUnderline className={classes.description} 
          inputRef={(ref) => this.descriptionRef = ref }
          placeholder="Description" value={this.state.deck.description}
          onChange={this.descriptionInputChanged.bind(this)}
          onKeyPress={this.keyPressed.bind(this)}
          onKeyUp={this.keyUp.bind(this)}/>
      </Paper>
    );
  }

  nameInputChanged(e) {
    this.deck = this.state.deck.set('name', e.target.value);
    this.setState({ deck: this.deck });
    this.deckChanged(this.deck);
  }

  descriptionInputChanged(e) {
    this.deck = this.state.deck.set('description', e.target.value);
    this.setState({ deck: this.deck });
    this.deckChanged(this.deck);
  }

  deckChanged(newDeck) {
    if (this.props.onDeckChanged)
      this.props.onDeckChanged(newDeck, this);
  }

  keyPressed(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.tryToFinish();
    }
  }

  keyUp(e) {
    if (e.key === 'Escape') {
      this.cancel();
    }
  }

  tryToFinish() {
    try {
      this.validate();
      this.finished();
    } catch(error) {
      // Process error
    }
  }

  validate() {
    this.components.forEach(comp => {
      if (!this.validateProp(comp.name, comp.ref.value)) {
        comp.ref.focus();
        throw `Invalid ${comp.name}`;
      }
    });
  }

  validateProp(prop, value) {
    return this.props.validation ?
      this.props.validation(prop, value) : true;
  }

  finished() {
    if (this.props.onFinished)
      this.props.onFinished(this.deck, this);
  }

  cancel() {
    if (this.props.onCanceled)
      this.props.onCanceled(this);
  }

}

export default withStyles(stylesheets)(Edit);
