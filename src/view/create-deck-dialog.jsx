import React from 'react';
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
      <Dialog open={open} onRequestClose={this._handleCloseRequest.bind(this)}>
        <DialogTitle>
          Create new deck
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus required label="Name" value={this.state.name} margin="dense" 
            onChange={this._handleNameTextChange.bind(this)} />
          <TextField fullWidth multiline rows={2}label="Description" value={this.state.description} margin="dense" 
            onChange={this._handleDescriptionTextChange.bind(this)} />
        </DialogContent>
        <DialogActions>
          <Button color="accent" onClick={this._handleCreateDeckButtonClick.bind(this)}>Create</Button>
          <Button onClick={this._handleCancelButtonClick.bind(this)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }

  _handleNameTextChange(e) {
    this.setState({ name: e.target.value });
  }

  _handleDescriptionTextChange(e) {
    this.setState({ description: e.target.value });
  }

  _handleCloseRequest() {
    if (this.props.onRequestClose)
      this.props.onRequestClose();
  }

  _handleCreateDeckButtonClick() {
    const name = this.state.name.trim();
    const description = this.state.description.trim();
    if (name) this._createDeck(name, description);
  }

  _handleCancelButtonClick() {
    if (this.props.onRequestClose)
      this.props.onRequestClose();
    this._clear();
  }

  _createDeck(name, description) {
    const deck = {name, description};
    this._clear();
    this._onCreateDeck(deck);
  }

  _onCreateDeck(deck) {
    if (this.props.onCreateDeck)
      this.props.onCreateDeck(deck);
  }

  _clear() {
    this.setState({
      name: '',
      description: ''
    });
  }

}

export default CreateDeckDialog;
