import React from 'react';
import DecksActions from '../data/decks-actions';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

/*
Stylesheet.
*/
const stylesheet = createStyleSheet('CreateDeckDialog', (theme) => {
  return {
  };
});

/**
 * Create deck dialog component.
 */
class CreateDeckDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  render() {
    const { classes, open } = this.props;

    return (
      <Dialog open={open} onRequestClose={this.handleCloseRequest.bind(this)}>
        <DialogTitle className={classes.header}>
          Create new deck
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus required label="Name" value={this.state.name} margin="dense" 
            onChange={this.handleNameTextChange.bind(this)} />
          <TextField fullWidth multiline rows={2}label="Description" value={this.state.description} margin="dense" 
            onChange={this.handleDescriptionTextChange.bind(this)} />
        </DialogContent>
        <DialogActions>
          <Button color="accent" onClick={this.handleCreateDeckButtonClick.bind(this)}>Create</Button>
          <Button onClick={this.handleCancelButtonClick.bind(this)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleNameTextChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDescriptionTextChange(e) {
    this.setState({ description: e.target.value });
  }

  handleCloseRequest() {
    if (this.props.onRequestClose)
      this.props.onRequestClose();
  }

  handleCreateDeckButtonClick() {
    const name = this.state.name.trim();
    const description = this.state.description.trim();
    if (name)
      this.createDeck(name, description);
  }

  handleCancelButtonClick() {
    if (this.props.onRequestClose)
      this.props.onRequestClose();
    this.clear();
  }

  createDeck(name, description) {
    DecksActions.addDeck(name, description);
    DecksActions.stopCreatingDeck();
    this.clear();
  }

  clear() {
    this.setState({
      name: '',
      description: ''
    });
  }

}

const StyledCreateDeckDialog = withStyles(stylesheet)(CreateDeckDialog);

export default StyledCreateDeckDialog;
