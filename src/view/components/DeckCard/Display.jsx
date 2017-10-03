import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import DeckCardBase from './Base';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import stylesheets from './Display.style';

/**
 * Deck card display.
 * It's used to display a deck in shape of read only card.
 */
function DisplayDeckCard(props) {

  const {
    className,
    classes,
    onStartEditDeck,
    onDeleteDeck,
    cardsCount = 0,
    ...rest
  } = props;

  const actions = <Actions
    classes={classes}
    onDeleteDeck={onDeleteDeck}
    onStartEditDeck={onStartEditDeck} />;

  const cardsCountEl = <CardsCount
    classes={classes}
    count={cardsCount} />;

  return <DeckCardBase {...rest}
    className={classnames(className, classes.root)}
    topRight={actions}
    bottomLeft={cardsCountEl} />;

}

/*
Menu actions.
*/
class Actions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.onMenuIconClicked.bind(this)}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={this.state.open}
          anchorEl={this.anchorEl}
          onRequestClose={this.onClosedRequested.bind(this)}>
          <MenuItem onClick={this.onClickEdit.bind(this)}>
            Edit
          </MenuItem>
          <MenuItem onClick={this.onClickDelete.bind(this)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }

  onMenuIconClicked(e) {
    e.stopPropagation();
    this.anchorEl = e.target;
    this.showMenu();
  }

  onClosedRequested() {
    this.setState({
      open: false
    });
  }

  onClickEdit() {
    this.requestEditDeck();
    this.hideMenu();
  }

  onClickDelete() {
    this.requestDeleteDeck();
    this.hideMenu();
  }

  requestEditDeck() {
    if (this.props.onStartEditDeck)
      this.props.onStartEditDeck();
  }

  requestDeleteDeck() {
    if (this.props.onDeleteDeck)
      this.props.onDeleteDeck();
  }

  showMenu() {
    this.setState({
      open: true
    });
  }

  hideMenu() {
    this.setState({
      open: false
    });
  }

}

/*
Cards count.
*/
function CardsCount(props) {
  return (
    <div className={props.classes.cardsCount}>
      <Typography type='caption'>
        {props.count} cards.
      </Typography>
    </div>
  );
}

export default withStyles(stylesheets)(DisplayDeckCard);
