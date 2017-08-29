import React from 'react';
import { Container } from 'flux/utils';
import { withStyles } from 'material-ui/styles';
import Actions from '../Actions';
import ActionsTypes from '../ActionsTypes';
import DecksActions from '../../data/DecksActions';
import DeckStore from '../../data/DeckStore.js';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import EditCardDialog from '../component/EditCardDialog';
import Card from '../component/Card/Card';

/*
DeckPage stylesheets.
*/
const stylesheet = (theme) => {
  return {
    root: {
      height: '100%'
    },
    cardsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing.unit
    },
    noCardsContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      margin: theme.spacing.unit

    },
    cardMenu: {
      top: 0,
      right: 0
    }
  };
};

/**
 * One deck page.
 */
class DeckPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creatingCard: false
    };
  }

  static getStores() {
    return [DeckStore];
  }

  static calculateState() {
    return {
      deck: DeckStore.getState()
    };
  }

  componentWillMount() {
    Actions.addListener(this);
    const deckId = parseInt(this.props.match.params.deckId, 10);
    DecksActions.fetchDeckById(deckId);
  }

  componentWillUnmount() {
    Actions.removeListener(this);
  }

  onActionPerformed(action) {
    if (action === ActionsTypes.ADD_CARD) {
      this.setState({ creatingCard: true });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderAddCardDialog()}
        {this.renderEditCardDialog()}
        {this.renderPage(classes)}
      </div>
    );
  }

  renderAddCardDialog() {
    if (this.state.creatingCard) {
      return <EditCardDialog
        doneText='Create'
        onEditDone={this.onCreateCard.bind(this)}
        onRequestClose={this.onAddCardDialogClose.bind(this)}
      />;
    } else {
      return null;
    }
  }

  onCreateCard(card) {
    // TODO: validate new card
    let deck = this.state.deck;
    deck = deck.set('cards', deck.cards.push(card));
    this.setState({
      deck,
      creatingCard: false
    });
    DecksActions.updateDeck(deck);
  }

  onAddCardDialogClose() {
    this.setState({ creatingCard: false });
  }

  renderEditCardDialog() {
    if (this.state.editingCard) {
      const card = this.state.editingCard;
      return <EditCardDialog
        doneText='Save'
        front={card.front}
        back={card.back}
        onRequestClose={this.onEditCardDialogClose.bind(this)}
        onEditDone={this.onEditCard.bind(this)}
      />;
    }
  }

  onEditCardDialogClose() {
    this.setState({
      editingCard: null
    });
  }

  onEditCard() {
  }

  renderPage(classes) {
    if (this.state.deck) {
      return this.renderCards(classes, this.state.deck.cards);
    } else {
      return <span>Loading...</span>;
    }
  }

  renderCards(classes) {
    const cards = this.state.deck.cards;
    if (cards && cards.size > 0) {
      return this.renderCardsItems(classes, cards);
    } else {
      return this.renderNoCardsMessage(classes);
    }
  }

  renderCardsItems(classes, cards) {
    const items = cards.map((card, index) => {
      return this.renderCardItem(classes, card, index);
    });
    return <div className={classes.cardsContainer}>{items}</div>;
  }

  renderCardItem(classes, card, key) {
    return <CardItem key={key} classes={classes} card={card}
      onRequestEdit={this.onRequestEditCard.bind(this, card)} />;
  }

  onRequestEditCard(card) {
    this.setState({ editingCard: card });
  }

  renderNoCardsMessage(classes) {
    return (
      <div className={classes.noCardsContainer}>
        <Typography type="display1">No cards</Typography>
        <Typography type="subheading">There's no added cards yet.</Typography>
      </div>
    );
  }

  renderAddCard() {
    return <Typography>{this.state.action}</Typography>;
  }

}

/* Card item component. */
class CardItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reversed: false
    };
  }

  render() {
    const { classes, card, onRequestEdit, ...rest } = this.props;
    return (
      <Card {...rest} className={classes.card}
        menu={<CardMenu card={card} onRequestEdit={onRequestEdit} />}
        menuClass={classes.cardMenu}
        showMenu={true}
        front={card.front}
        back={card.back}
        reversed={this.state.reversed}
        onClick={this.onClick.bind(this)} />
    );
  }

  onClick() {
    this.setState((prevState) => {
      return {
        reversed: !prevState.reversed
      };
    });
  }

}

/* Card item menu component. */
class CardMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.onClick.bind(this)}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={this.state.open}
          anchorEl={this.state.element}
          onRequestClose={this.onRequestClose.bind(this)}>
          <MenuItem onClick={this.onRequestEdit.bind(this)}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </div>
    );
  }

  onClick(e) {
    e.stopPropagation();
    this.setState({ open: true, element: e.currentTarget });
  }

  onRequestClose() {
    this.setState({ open: false });
  }

  onRequestEdit() {
    if (this.props.onRequestEdit)
      this.props.onRequestEdit(this);
    this.setState({ open: false });
  }

}

/*
DeckPageTitle
*/
class PageTitle extends React.Component {

  static getStores() {
    return [DeckStore];
  }

  static calculateState() {
    return {
      deck: DeckStore.getState()
    };
  }

  render() {
    if (this.state.deck) {
      return this.renderDeck();
    } else {
      return <span />;
    }
  }

  renderDeck() {
    return (
      <span>
        {this.state.deck.name}
      </span>
    );
  }

}

const TitleContainer = Container.create(PageTitle);

/*
DeckPageActions
*/
function PageActions() {
  return (
    <Button color="inherit" onClick={() => Actions.execute(ActionsTypes.ADD_CARD)}>
      Add card
    </Button>
  );
}

export default withStyles(stylesheet)(Container.create(DeckPage));

export {
  TitleContainer as DeckPageTitle,
  PageActions as DeckPageActions
};
