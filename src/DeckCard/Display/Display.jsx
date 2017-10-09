import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import stylesheets from './Display.style';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVerIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

const Display = (props) => {

  const deck = props.deck;
  const classes = {
    root: classnames(props.className, props.classes.root, props.rootClass),
    menu: classnames(props.classes.menu, props.menuClass),
    name: classnames(props.classes.name, props.nameClass),
    description: classnames(props.classes.description, props.descriptionClass),
    cardsCount: classnames(props.classes.cardsCount, props.cardsCountClass)
  }

  return (
    <Paper className={classes.root}>
      <DisplayMenu classes={classes} options={props.options} />
      <div className={classes.name}>{deck.name}</div>
      <div className={classes.description}>{deck.description}</div>
      <div className={classes.cardsCount}>{deck.cards.toArray().length} cards.</div>
    </Paper>
  );

};

class DisplayMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonRef: null,
      open: false
    }
  }

  render() {
    if (!this.props.options)
      return null;

    const options = this.props.options.map((option, index) => (
      <MenuItem onClick={() => this.performOptionAction(option)} key={index}>
        {option.label}
      </MenuItem>
    ));

    return (
      <div className={this.props.classes.menu}>
        <IconButton onClick={this.openMenu.bind(this)}>
          <MoreVerIcon />
        </IconButton>
        <Menu anchorEl={this.state.buttonRef} open={this.state.open} onRequestClose={this.closeMenu.bind(this)}>
          {options}
        </Menu>
      </div>
    );
  }

  performOptionAction(option) {
    if (option.action)
      option.action();
    this.closeMenu();
  }

  openMenu(e) {
    this.setState({
      buttonRef: e.target,
      open: true
    });
  }

  closeMenu() {
    this.setState({
      buttonRef: null,
      open: false
    });
  }

}

export default withStyles(stylesheets)(Display);
