import React from 'react';
import DecksActions from '../data/decks-actions';
import CreatingDeckActions from '../data/creating-deck-actions';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

/**
 * Create deck dialog component.
 */
class CreateDeckDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={open} onRequestClose={this.handleCloseRequest.bind(this)}>
        <DialogTitle>
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
    DecksActions.addDeck({name, description});
    CreatingDeckActions.stopDeckCreation();
    this.clear();
  }

  clear() {
    this.setState({
      name: '',
      description: ''
    });
  }

}

export default CreateDeckDialog;
