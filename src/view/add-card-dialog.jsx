import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import EditableCard from './card/editable-card';
import Button from 'material-ui/Button';
import CardModel from '../data/card';

/*
Stylesheets.
*/
const stylesheets = (theme) => {
  return {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: theme.mixins.gutters({
      margin: theme.spacing.unit * 4
    }),
    cardPaper: {
      background: theme.palette.background.default
    }
  };
};

/**
 * Add card dialog.
 */
class AddCardDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reversed: false,
      front: '',
      back: ''
    };
  }

  render() {
    const classes = { paper: this.props.classes.cardPaper };
    return (
      <Dialog open={true} fullScreen classes={classes} onRequestClose={this.onRequestClose.bind(this)}>
        <div className={this.props.classes.root}>
          {this.renderCard()}
          {this.renderButtons()}
        </div>
      </Dialog>
    );
  }

  sideTitle() {
    return this.state.reversed ? 'Back' : 'Front';
  }

  renderCard() {
    const face = this.state.reversed ? 'back' : 'front';
    return <EditableCard className={this.props.classes.card}
      face={face} front={this.state.front} back={this.state.back}
      frontPlaceholder='Front' backPlaceholder='Back'
      onFrontChange={this.onFrontChange.bind(this)}
      onBackChange={this.onBackChange.bind(this)}
    />;
  }

  renderButtons() {
    return (
      <div>
        <Button onClick={this.handleFlipButtonClick.bind(this)}>Flip</Button>
        <Button color='primary' onClick={this.onCreateButtonClick.bind(this)}>Create</Button>
      </div>
    );
  }

  onFrontChange(value) {
    this.setState({ front: value });
  }

  onBackChange(value) {
    this.setState({ back: value });
  }

  handleFlipButtonClick() {
    this.setState((prevState) => {
      return {
        reversed: !prevState.reversed
      };
    });
  }

  onCreateButtonClick() {
    const card = new CardModel({
      front: this.state.front,
      back: this.state.back
    });
    this.notifyCardCreation(card);
  }

  onRequestClose() {
    if (this.props.onRequestClose)
      this.props.onRequestClose(this);
  }

  notifyCardCreation(card) {
    if (this.props.onCreateCard)
      this.props.onCreateCard(card, this);
  }

}

export default withStyles(stylesheets)(AddCardDialog);
