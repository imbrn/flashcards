import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import EditableCard from './Card/EditableCard';
import CardModel from '../../data/CardModel';

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
    card: {
      margin: theme.spacing.unit * 4
    },
    cardPaper: {
      background: theme.palette.background.default
    }
  };
};

/**
 * Add card dialog.
 */
class EditCardDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reversed: false,
      front: props.front ? props.front : null,
      back: props.back ? props.back : null
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

  renderCard() {
    return <EditableCard className={this.props.classes.card}
      reversed={this.state.reversed}
      front={this.state.front} back={this.state.back}
      frontPlaceholder='Front' backPlaceholder='Back'
      onFrontChange={this.onFrontChange.bind(this)}
      onBackChange={this.onBackChange.bind(this)}
    />;
  }

  renderButtons() {
    return (
      <div>
        <Button onClick={this.handleFlipButtonClick.bind(this)}>{this.flipText()}</Button>
        <Button color='primary' onClick={this.onDoneButtonClick.bind(this)}>{this.doneText()}</Button>
      </div>
    );
  }

  flipText() {
    return this.props.flipText ? this.props.flipText : 'Flip';
  }

  doneText() {
    return this.props.doneText ? this.props.doneText : 'Done';
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

  onDoneButtonClick() {
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
    if (this.props.onEditDone)
      this.props.onEditDone(card, this);
  }

}

export default withStyles(stylesheets)(EditCardDialog);
