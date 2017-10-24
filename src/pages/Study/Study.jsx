import React from 'react';
import SelectedDeckStore from '../../flux/stores/SelectedDeckStore';
import SelectedDeckActions from '../../flux/actions/SelectedDeckActions';

class StudyPage extends React.Component {

  constructor(props) {
    super(props);
    this.initState();
    this.initStores();
  }

  initState() {
    this.state = {
      selected: SelectedDeckStore.getState()
    };
  }

  initStores() {
    this.selectedDeckStoreListener =
      SelectedDeckStore.addListener(this.selectedDeckStoreChanged.bind(this));
  }

  selectedDeckStoreChanged() {
    this.setState({
      selected: SelectedDeckStore.getState()
    });
  }

  componentWillMount() {
    this.initialActions();
  }

  initialActions() {
    SelectedDeckActions.select(this.props.match.params.deckId);
  }

  render() {
    return (
      <div>{this.state.selected.get('deck').cards.size}</div>
    );
  }

}

export default StudyPage;
